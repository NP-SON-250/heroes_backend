import responsesModel from "../models/Congozi.responses.models";
import Exams from "../models/Congozi.exams.models";
import Questions from "../models/Congozi.questions.models";
import Options from "../models/Congozi.options.models";
import WaittingExams from "../models/Congozi.waittingexams.models";
import ExpiredExams from "../models/Congozi.expiredexams.models";
import PassedExams from "../models/Congozi.passedexams.models";
import FailledExams from "../models/Congozi.failedexams.models";
import Purchases from "../models/Congozi.purchases.models";

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
  
      // Check if user has responded the same exam and remove record
      const findrespondedRecord = await responsesModel.findOne({
        examId: examId,
        userId: userId,
      });
      if (findrespondedRecord) {
        await responsesModel.findByIdAndDelete(findrespondedRecord._id);
      }
  
      let correctOptionIds = [];
  
      // Iterate through each response
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
  
      // Create the response document
      const savedResponse = await responsesModel.create({
        examId: examId,
        userId: userId,
        correctOptionId: correctOptionIds,
        responses,
      });
  
      // ===== Now handle waiting, expired, passed/failed =====
  
      // 1. Delete from waiting model
      await WaittingExams.deleteOne({ exam: examId, purchasedBy: userId });
  
      await Purchases.deleteOne({ itemId: examId, purchasedBy: userId });
      // 2. Insert into ExpiredExams
      await ExpiredExams.create({
        exam: examId,
        purchasedBy: userId,
      });
  
      // 3. Calculate total points
      let totalPoints = 0;
      for (const response of responses) {
        const selectedOption = await Options.findById(response.selectedOptionId);
        if (selectedOption && selectedOption.isCorrect === true) {
          totalPoints += 1;
        }
      }
  
      // 4. Insert into PassedExams or FailledExams
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
