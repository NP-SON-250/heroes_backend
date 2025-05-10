import Questions from "../models/Congozi.questions.models";
import Exams from "../models/Congozi.exams.models";
import { uploadToCloud } from "../helper/cloud";
// Service to create question
export const createQuestions = async (id, questionData, file) => {
  const { phrase, marks } = questionData;

  try {
    // Check if exam exists
    const isExam = await Exams.findById(id);
    if (!isExam) {
      throw new Error("This exam does not exist");
    }

    // Check if phrase already exists in the same exam
    const phraseExist = await Questions.findOne({ phrase, id });
    if (phraseExist) {
      throw new Error("This question exists in selected exam");
    }

    // Upload image if provided
    let imageUrl = null;
    if (file) {
      const result = await uploadToCloud(file);
      imageUrl = result.secure_url;
    }

    // Create question
    const question = await Questions.create({
      phrase,
      marks,
      image: imageUrl,
      exam:id,
    });

    // Update exam with this new question
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

// Service to update a question
export const updateQuestion = async (id, questionData, file) => {
  const { phrase, marks } = questionData;

  try {
    const questionExist = await Questions.findById(id);
    if (!questionExist) {
      throw new Error("Question not found");
    }

    // Check if another question with the same phrase exists in the same exam
    const duplicate = await Questions.findOne({
      _id: { $ne: id }, // exclude current question
      phrase,
      exam: questionExist.exam, // same exam
    });

    if (duplicate) {
      throw new Error("This question already exists");
    }

    // If a new image is provided, upload it
    if (file) {
      const result = await uploadToCloud(file);
      questionData.image = result.secure_url;
    }

    const updatedQuestion = await Questions.findByIdAndUpdate(id, questionData, {
      new: true,
    });

    return updatedQuestion;
  } catch (error) {
    throw new Error(`Error updating question: ${error.message}`);
  }
};

// Service to delete a question
export const deleteQuestion = async (id) => {
  try {
    const isExist = await Questions.findById(id);
    if (!isExist) {
      throw new Error("Question not found");
    }

    // Remove the question ID from the related exam's questions array (if it exists)
    await Exams.updateOne(
      { _id: isExist.exam },
      { $pull: { questions: id } }
    );

    await Questions.findByIdAndDelete(id);

    return {
      message: "Question deleted",
      deletedQuestion: isExist,
    };
  } catch (error) {
    throw new Error(`Error deleting question: ${error.message}`);
  }
};
// Service to get all questions
export const getAllQuestions = async (exam) => {
  try {
    const allQuestions = await Questions.find({ exam: exam });
    return allQuestions;
  } catch (error) {
    throw new Error(`Error retrieving questions: ${error.message}`);
  }
};
// Service to get single question
export const getQuestionById = async (id) => {
  try {
    const question = await Questions.findById(id).populate('options');
    if (!question) {
      throw new Error("Question not found");
    }
    return question;
  } catch (error) {
    throw new Error(`Error retrieving question: ${error.message}`);
  }
};

