import FailledExams from "../models/Congozi.failedexams.models";

// Service to get all failled exams for a logged-in user
export const getUserFailledExams = async (userId) => {
  try {
    const exams = await FailledExams.find({ purchasedBy: userId })
      .populate({
        path: "exam",
      })
      .sort({ createdAt: -1 });

    return exams;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user failled exams");
  }
};

// Service to get a single failled exam for the logged-in user
export const getSingleUserFailledExams = async (userId, id) => {
  try {
    const exam = await FailledExams.findOne({
      _id: id,
      purchasedBy: userId,
    }).populate({
      path: "exam",
    });

    if (!exam) {
      throw new Error("Failled exam not found or unauthorized access");
    }

    return exam;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the failled exam");
  }
};
