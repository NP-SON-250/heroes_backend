import UnpaidExams from "../models/Heroes.unpaidexams.models";
import * as unpaidExamsServices from "../services/Heroes.unpaidexams.services";

export const getLoggedInUserUnpaidExams = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const unpaid = await unpaidExamsServices.getUserUnpaidExams(userId);

    return res.status(200).json({
      status: "200",
      message: "Unpaid exams retrieved",
      data: unpaid,
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

export const getLoggedInUserSingleUnpaid = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const { id } = req.params;

    const unpaid = await purchaseServices.getSingleUserPurchase(userId, id);

    return res.status(200).json({
      status: "200",
      message: "Unpaid exam retrieved",
      data: unpaid,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      status: "404",
      message: "Unpaid exam not found",
      error: error.message,
    });
  }
};

export const deleteUnpaid = async (req, res) => {
  try {
    const { id } = req.params;
    const dataDelete = await UnpaidExams.findOneAndDelete({ exam: id });
    return res.status(200).json({
      status: "Done",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "error",
      error: error.message,
    });
  }
};
