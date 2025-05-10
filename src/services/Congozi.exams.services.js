import Exams from "../models/Congozi.exams.models";
import Purchases from "../models/Congozi.purchases.models";
import responsesModel from "../models/Congozi.responses.models";
import UnpaidExams from "../models/Congozi.unpaidexams.models";
import WaittingExams from "../models/Congozi.waittingexams.models";
import PassedExams from "../models/Congozi.passedexams.models";
import FailledExams from "../models/Congozi.failedexams.models";
import ExpiredExams from "../models/Congozi.expiredexams.models";
import TotalUserExams from "../models/Congozi.totaluserexams.models";
// Service to get test exam wth number
export const getExamByNumber = async (number) => {
  try {
    const { type } = "Test" || "test";
    const isExist = await Exams.findOne({
      number,
      type: { $regex: /^test$/, $options: "i" },
    }).populate({
      path: "questions",
      populate: {
        path: "options",
        model: "options",
      },
    });
    if (!isExist) {
      throw new Error("Exam not found");
    }
    return isExist;
  } catch (error) {
    throw new Error(`Error retrieving exam: ${error.message}`);
  }
};
// Service to create exam
export const createExam = async (examData) => {
  const { title, type, number, fees } = examData;

  try {
    // Check if exam with same number and same type already exists
    const existingExam = await Exams.findOne({ number, type });
    if (existingExam) {
      throw new Error("This exam already exists with the same number and type");
    }

    // Create the exam
    const exam = await Exams.create({
      title,
      type,
      number,
      fees,
    });

    return {
      message: "Exam recorded",
      Exam: exam,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error creating exam: ${error.message}`);
  }
};

// Service to update an exam
export const updateExams = async (id, examData) => {
  const { type, number } = examData;

  try {
    const examExist = await Exams.findById(id);
    if (!examExist) {
      throw new Error("Exam not found");
    }

    // If number is being updated (but not type)
    if (number && !type) {
      const duplicate = await Exams.findOne({
        number,
        type: examExist.type,
        _id: { $ne: id },
      });

      if (duplicate) {
        throw new Error(
          "An exam with this number and same type already exists"
        );
      }
    }

    // If type is being updated (but not number)
    if (type && !number) {
      const duplicate = await Exams.findOne({
        type,
        number: examExist.number,
        _id: { $ne: id },
      });

      if (duplicate) {
        throw new Error(
          "An exam with this type and same number already exists"
        );
      }
    }

    // If both type and number are being updated
    if (type && number) {
      const duplicate = await Exams.findOne({
        type,
        number,
        _id: { $ne: id },
      });

      if (duplicate) {
        throw new Error("An exam with this number and type already exists");
      }
    }

    const updatedExam = await Exams.findByIdAndUpdate(id, examData, {
      new: true,
    });

    return updatedExam;
  } catch (error) {
    throw new Error(`Error updating exam: ${error.message}`);
  }
};

// Service to delete an exam
export const deleteExam = async (id) => {
  try {
    const isExist = await Exams.findById(id);
    if (!isExist) {
      throw new Error("Exam not found");
    }
    await Purchases.deleteMany({
      itemId: id,
      itemType: "exams",
    });
    await responsesModel.deleteMany({
      examId: id,
    });
    await UnpaidExams.deleteMany({
      exam: id,
    });
    await WaittingExams.deleteMany({
      exam: id,
    });

    await PassedExams.deleteMany({
      exam: id,
    });
    await FailledExams.deleteMany({
      exam: id,
    });
    await ExpiredExams.deleteMany({
      exam: id,
    });
    await TotalUserExams.deleteMany({
      exam: id,
    });
    await Exams.findByIdAndDelete(id);
    return {
      message: "Exam deleted",
      deletedExam: isExist,
    };
  } catch (error) {
    throw new Error(`Error deleting exam: ${error.message}`);
  }
};
// Service to get all exams
export const getAllExams = async () => {
  try {
    const allExams = await Exams.find();
    return allExams;
  } catch (error) {
    throw new Error(`Error retrieving exams: ${error.message}`);
  }
};
// Service to get single exam
export const getExamById = async (id) => {
  try {
    const isExist = await Exams.findById(id).populate({
      path: "questions",
      populate: {
        path: "options",
        model: "options",
      },
    });
    if (!isExist) {
      throw new Error("Exam not found");
    }
    return isExist;
  } catch (error) {
    throw new Error(`Error retrieving exam: ${error.message}`);
  }
};
