import WaittingExams from "../models/Congozi.waittingexams.models";

// Service to get all waitting exams for a logged-in user
export const getUserWaittingExams = async (userId) => {
  try {
    const exams = await WaittingExams.find({ purchasedBy: userId })
      .populate({
        path: "exam",
      })
      .sort({ createdAt: -1 });

    return exams;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user waitting exams");
  }
};

// Service to get a single waitting exam for the logged-in user
export const getSingleUserWaittingExam = async (userId, id) => {
  try {
    const exam = await WaittingExams.findOne({
      _id: id,
      purchasedBy: userId,
    }).populate({
      path: "exam",
    });

    if (!exam) {
      throw new Error("Waitting exam not found or unauthorized access");
    }

    return exam;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the waitting exam");
  }
};
