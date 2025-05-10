import TotalUserExams from "../models/Congozi.totaluserexams.models";

// Service to get all total user exams for a logged-in user
export const getTotalUserExams = async (userId) => {
  try {
    const exams = await TotalUserExams.find({ purchasedBy: userId })
      .populate({
        path: "exam",
      })
      .sort({ createdAt: -1 });

    return exams;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve total user exams");
  }
};

// Service to get a single total user exam for the logged-in user
export const getSingleTotalUserExams = async (userId, id) => {
  try {
    const exam = await TotalUserExams.findOne({
      _id: id,
      purchasedBy: userId,
    }).populate({
      path: "exam",
    });

    if (!exam) {
      throw new Error("Total user exam not found or unauthorized access");
    }

    return exam;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the total user exam");
  }
};
