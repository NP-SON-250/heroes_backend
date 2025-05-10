import * as totalUserExamsServices from "../services/Congozi.totaluserexams.services";

export const getLoggedInTotalUserExams = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const total = await totalUserExamsServices.getTotalUserExams(userId);

    return res.status(200).json({
      status: "200",
      message: "Total user exams retrieved",
      data: total,
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

export const getLoggedInSingleTotalUserExams = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const { id } = req.params;

    const total = await totalUserExamsServices.getSingleTotalUserExams(
      userId,
      id
    );

    return res.status(200).json({
      status: "200",
      message: "Total user exam retrieved",
      data: total,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      status: "404",
      message: "Total user exam not found",
      error: error.message,
    });
  }
};
