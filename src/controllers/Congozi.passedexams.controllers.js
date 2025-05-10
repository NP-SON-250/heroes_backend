import * as passedExamsServices from "../services/Congozi.passedexams.services";

export const getLoggedInUserPassedExams = async (req, res) => {
    try {
      const userId = req.loggedInUser.id;
      const passed = await passedExamsServices.getUserPassedExams(userId);
  
      return res.status(200).json({
        status: "200",
        message: "Passed exams retrieved",
        data: passed,
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

  export const getLoggedInUserSinglePassed = async (req, res) => {
    try {
      const userId = req.loggedInUser.id;
      const {id} = req.params;
  
      const passed = await passedExamsServices.getSingleUserPassedExams(userId, id);
  
      return res.status(200).json({
        status: "200",
        message: "Passed exam retrieved",
        data: passed,
      });
    } catch (error) {
      console.error(error);
      return res.status(404).json({
        status: "404",
        message: "Passed exam not found",
        error: error.message,
      });
    }
  };