import Exams from "../models/Heroes.exams.models";
import Purchases from "../models/Heroes.purchases.models";
import responsesModel from "../models/Heroes.responses.models";
import UnpaidExams from "../models/Heroes.unpaidexams.models";
import WaittingExams from "../models/Heroes.waittingexams.models";
import PassedExams from "../models/Heroes.passedexams.models";
import FailledExams from "../models/Heroes.failedexams.models";
import ExpiredExams from "../models/Heroes.expiredexams.models";
import TotalUserExams from "../models/Heroes.totaluserexams.models";

export const getExamByNumber = async (number) => {
  try {
    const { type } = "kora" || "kora";
    const isExist = await Exams.findOne({
      number,
      type: { $regex: /^kora$/, $options: "i" },
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

export const createExam = async (examData) => {
  const { title, type, number, fees } = examData;

  try {
    const existingExam = await Exams.findOne({ number, type });
    if (existingExam) {
      throw new Error("This exam already exists with the same number and type");
    }
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
export const updateExams = async (id, examData) => {
  const { type, number } = examData;

  try {
    const examExist = await Exams.findById(id);
    if (!examExist) {
      throw new Error("Exam not found");
    }
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
export const getAllExams = async () => {
  try {
    const allExams = await Exams.find();
    return allExams;
  } catch (error) {
    throw new Error(`Error retrieving exams: ${error.message}`);
  }
};

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
