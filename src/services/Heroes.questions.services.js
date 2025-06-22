import Questions from "../models/Heroes.questions.models";
import Exams from "../models/Heroes.exams.models";
import { uploadToCloud } from "../helper/cloud";
export const createQuestions = async (id, questionData, file) => {
  const { phrase, marks } = questionData;

  try {
    const isExam = await Exams.findById(id);
    if (!isExam) {
      throw new Error("This exam does not exist");
    }
    const phraseExist = await Questions.findOne({ phrase, id });
    if (phraseExist) {
      throw new Error("This question exists in selected exam");
    }
    let imageUrl = null;
    if (file) {
      const result = await uploadToCloud(file);
      imageUrl = result.secure_url;
    }
    const question = await Questions.create({
      phrase,
      marks,
      image: imageUrl,
      exam: id,
    });
    await Exams.findByIdAndUpdate(
      id,
      { $push: { questions: question._id } },
      { new: true }
    );

    return {
      message: "Question recorded",
      Question: question,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error creating question: ${error.message}`);
  }
};
export const updateQuestion = async (id, questionData, file) => {
  const { phrase, marks } = questionData;

  try {
    const questionExist = await Questions.findById(id);
    if (!questionExist) {
      throw new Error("Question not found");
    }
    const duplicate = await Questions.findOne({
      _id: { $ne: id },
      phrase,
      exam: questionExist.exam,
    });

    if (duplicate) {
      throw new Error("This question already exists");
    }
    if (file) {
      const result = await uploadToCloud(file);
      questionData.image = result.secure_url;
    }

    const updatedQuestion = await Questions.findByIdAndUpdate(
      id,
      questionData,
      {
        new: true,
      }
    );

    return updatedQuestion;
  } catch (error) {
    throw new Error(`Error updating question: ${error.message}`);
  }
};

export const deleteQuestion = async (id) => {
  try {
    const isExist = await Questions.findById(id);
    if (!isExist) {
      throw new Error("Question not found");
    }
    await Exams.updateOne({ _id: isExist.exam }, { $pull: { questions: id } });

    await Questions.findByIdAndDelete(id);

    return {
      message: "Question deleted",
      deletedQuestion: isExist,
    };
  } catch (error) {
    throw new Error(`Error deleting question: ${error.message}`);
  }
};
export const getAllQuestions = async (exam) => {
  try {
    const allQuestions = await Questions.find({ exam: exam });
    return allQuestions;
  } catch (error) {
    throw new Error(`Error retrieving questions: ${error.message}`);
  }
};
export const getQuestionById = async (id) => {
  try {
    const question = await Questions.findById(id).populate("options");
    if (!question) {
      throw new Error("Question not found");
    }
    return question;
  } catch (error) {
    throw new Error(`Error retrieving question: ${error.message}`);
  }
};
