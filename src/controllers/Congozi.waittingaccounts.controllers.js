import * as waittingAccountsServices from "../services/Congozi.waittingaccounts.services";

export const getLoggedInUserWaittingAccounts = async (req, res) => {
    try {
      const userId = req.loggedInUser.id;
      const Waitting = await waittingAccountsServices.getUserWaittingAccounts(userId);
  
      return res.status(200).json({
        status: "200",
        message: "Waitting accounts retrieved",
        data: Waitting,
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
  
      const Waitting = await waittingAccountsServices.getSingleUserWaittingAccounts(userId, id);
  
      return res.status(200).json({
        status: "200",
        message: "Waitting account retrieved",
        data: Waitting,
      });
    } catch (error) {
      console.error(error);
      return res.status(404).json({
        status: "404",
        message: "Waitting account not found",
        error: error.message,
      });
    }
  };