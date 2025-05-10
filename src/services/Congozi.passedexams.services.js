import PassedExams from "../models/Congozi.passedexams.models";

// Service to get all passed exams for a logged-in user
export const getUserPassedExams = async (userId) => {
  try {
    const exams = await PassedExams.find({ purchasedBy: userId })
      .populate({
        path: "exam",
      })
      .sort({ createdAt: -1 });

    return exams;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user passed exams");
  }
};

// Service to get a single passed exam for the logged-in user
export const getSingleUserPassedExams = async (userId, id) => {
  try {
    const exam = await PassedExams.findOne({
      _id: id,
      purchasedBy: userId,
    }).populate({
      path: "exam",
    });

    if (!exam) {
      throw new Error("Passed exam not found or unauthorized access");
    }

    return exam;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the passed exam");
  }
};
