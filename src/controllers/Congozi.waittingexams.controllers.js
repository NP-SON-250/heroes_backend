import * as waittingExamsServices from "../services/Congozi.waittingexams.services";

export const getLoggedInUserWaittingExams = async (req, res) => {
    try {
      const userId = req.loggedInUser.id;
      const unpaid = await waittingExamsServices.getUserWaittingExams(userId);
  
      return res.status(200).json({
        status: "200",
        message: "Waitting exams retrieved",
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

  export const getLoggedInUserSingleWaitting = async (req, res) => {
    try {
      const userId = req.loggedInUser.id;
      const {id} = req.params;
  
      const unpaid = await waittingExamsServices.getSingleUserWaittingExam(userId, id);
  
      return res.status(200).json({
        status: "200",
        message: "Waitting exam retrieved",
        data: unpaid,
      });
    } catch (error) {
      console.error(error);
      return res.status(404).json({
        status: "404",
        message: "Waitting exam not found",
        error: error.message,
      });
    }
  };