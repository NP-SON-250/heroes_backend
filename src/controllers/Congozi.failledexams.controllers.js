import * as failledExamsServices from "../services/Congozi.failledexams.services";

export const getLoggedInUserFailledExams = async (req, res) => {
    try {
      const userId = req.loggedInUser.id;
      const failled = await failledExamsServices.getUserFailledExams(userId);
  
      return res.status(200).json({
        status: "200",
        message: "Failled exams retrieved",
        data: failled,
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

  export const getLoggedInUserSingleFailled = async (req, res) => {
    try {
      const userId = req.loggedInUser.id;
      const {id} = req.params;
  
      const failled = await failledExamsServices.getSingleUserFailledExams(userId, id);
  
      return res.status(200).json({
        status: "200",
        message: "Failled exam retrieved",
        data: failled,
      });
    } catch (error) {
      console.error(error);
      return res.status(404).json({
        status: "404",
        message: "Failled exam not found",
        error: error.message,
      });
    }
  };