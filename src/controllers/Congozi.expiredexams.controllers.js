import * as expiredExamsServices from "../services/Congozi.expiredexams.services";

export const getLoggedInUserExpiredExams = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const expired = await expiredExamsServices.getUserExpiredExams(userId);

    return res.status(200).json({
      status: "200",
      message: "Expired exams retrieved",
      data: expired,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getLoggedInUserSingleExpired = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const { id } = req.params;

    const expired = await expiredExamsServices.getSingleUserExpiredExams(
      userId,
      id
    );

    return res.status(200).json({
      status: "200",
      message: "Expired exam retrieved",
      data: expired,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      status: "404",
      message: "Expired exam not found",
      error: error.message,
    });
  }
};
