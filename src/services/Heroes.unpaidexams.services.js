import UnpaidExams from "../models/Heroes.unpaidexams.models";

export const getUserUnpaidExams = async (userId) => {
  try {
    const exams = await UnpaidExams.find({ purchasedBy: userId })
      .populate({
        path: "exam",
      })
      .sort({ createdAt: -1 });

    return exams;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user unpaid exams");
  }
};
export const getSingleUserUnpaidExam = async (userId, id) => {
  try {
    const exam = await UnpaidExams.findOne({
      _id: id,
      purchasedBy: userId,
    }).populate({
      path: "exam",
    });

    if (!exam) {
      throw new Error("Unpaid exam not found or unauthorized access");
    }

    return exam;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the unpaid exam");
  }
};
