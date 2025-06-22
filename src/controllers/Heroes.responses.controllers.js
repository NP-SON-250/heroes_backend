import responsesModel from "../models/Heroes.responses.models";
import Exams from "../models/Heroes.exams.models";
import Questions from "../models/Heroes.questions.models";
import Options from "../models/Heroes.options.models";
import ExpiredExams from "../models/Heroes.expiredexams.models";
import PassedExams from "../models/Heroes.passedexams.models";
import FailledExams from "../models/Heroes.failedexams.models";

export const addResponses = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const { responses, examId } = req.body;

    const checkExam = await Exams.findById(examId);
    if (!checkExam) {
      return res.status(404).json({
        status: "404",
        message: "Exam not found",
      });
    }
    const findrespondedRecord = await responsesModel.findOne({
      examId: examId,
      userId: userId,
    });
    if (findrespondedRecord) {
      await responsesModel.findByIdAndDelete(findrespondedRecord._id);
    }

    let correctOptionIds = [];
    for (const response of responses) {
      const { questionId } = response;

      const correctOption = await Options.findOne({
        questionId,
        isCorrect: true,
      });

      if (correctOption) {
        correctOptionIds.push(correctOption._id);
      }
    }
    const savedResponse = await responsesModel.create({
      examId: examId,
      userId: userId,
      correctOptionId: correctOptionIds,
      responses,
    });
    await ExpiredExams.create({
      exam: examId,
      purchasedBy: userId,
    });
    let totalPoints = 0;
    for (const response of responses) {
      const selectedOption = await Options.findById(response.selectedOptionId);
      if (selectedOption && selectedOption.isCorrect === true) {
        totalPoints += 1;
      }
    }
    if (totalPoints >= 12) {
      await PassedExams.create({
        exam: examId,
        purchasedBy: userId,
      });
    } else {
      await FailledExams.create({
        exam: examId,
        purchasedBy: userId,
      });
    }

    return res.status(200).json({
      status: "200",
      message: "Your response recorded successfully",
      data: savedResponse,
    });
  } catch (error) {
    console.error("Error saving response:", error.message);
    return res.status(500).json({
      status: "500",
      message: "Failed to respond exam",
      error: error.message,
    });
  }
};

export const getUserResponses = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const userResponses = await responsesModel
      .find({ userId })
      .populate("examId")
      .populate("responses.questionId")
      .populate("responses.selectedOptionId")
      .populate({
        path: "correctOptionId",
        model: "options",
      });

    if (!userResponses) {
      return res.status(404).json({
        status: "404",
        message: "No responses found for the user",
      });
    }

    const formattedResponses = await Promise.all(
      userResponses.map(async (response) => {
        const exam = await Exams.findById(response.examId).lean();
        let totalPoints = 0;

        const detailedResponses = await Promise.all(
          response.responses.map(async (resp) => {
            const question = await Questions.findById(resp.questionId).lean();
            const selectedOption = await Options.findById(
              resp.selectedOptionId
            ).lean();

            let optionMark = 0;
            if (selectedOption && selectedOption.isCorrect === true) {
              optionMark = 1;
            }
            totalPoints += optionMark;

            return {
              ...question,
              selectedOption,
            };
          })
        );
        return {
          ...exam,
          totalPoints,
          responses: detailedResponses,
          submittedAt: response.submittedAt,
          correctOptionId: response.correctOptionId,
        };
      })
    );
    return res.status(200).json({
      status: "200",
      message: "Your responses",
      data: formattedResponses,
    });
  } catch (error) {
    console.error("Error fetching user responses:", error.message);
    return res.status(500).json({
      status: "500",
      message: "Failed to fetch user responses",
      error: error.message,
    });
  }
};

export const deleteResponse = async (req, res) => {
  const { id } = req.params;
  const isResponseExist = await responsesModel.findById(id);
  if (!isResponseExist) {
    return res.status(404).json({
      status: "404",
      message: "Response not found",
    });
  }
  const deletedResponse = await responsesModel.findByIdAndDelete(id);
  return res.status(200).json({
    status: "200",
    message: "Response deleted",
    data: deletedResponse,
  });
};
