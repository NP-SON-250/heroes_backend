import ExpiredExams from "../models/Congozi.expiredexams.models";

// Service to get all expired exams for a logged-in user
export const getUserExpiredExams = async (userId) => {
  try {
    const exams = await ExpiredExams.find({ purchasedBy: userId })
      .populate({
        path: "exam",
      })
      .sort({ createdAt: -1 });

    return exams;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user expired exams");
  }
};

// Service to get a single expired exam for the logged-in user
export const getSingleUserExpiredExams = async (userId, id) => {
  try {
    const exam = await ExpiredExams.findOne({
      _id: id,
      purchasedBy: userId,
    }).populate({
      path: "exam",
    });

    if (!exam) {
      throw new Error("Expired exam not found or unauthorized access");
    }

    return exam;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the expired exam");
  }
};
