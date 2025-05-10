import * as totalUserAccountsServices from "../services/Congozi.totaluseraccounts.services";

export const getLoggedInTotalUserAccounts = async (req, res) => {
    try {
      const userId = req.loggedInUser.id;
      const total = await totalUserAccountsServices.getTotalUserAccounts(userId);
  
      return res.status(200).json({
        status: "200",
        message: "Total user accounts retrieved",
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

  export const getLoggedInSingleTotalUserAccounts = async (req, res) => {
    try {
      const userId = req.loggedInUser.id;
      const {id} = req.params;
  
      const total = await totalUserAccountsServices.getSingleTotalUserAccounts(userId, id);
  
      return res.status(200).json({
        status: "200",
        message: "Total user account retrieved",
        data: total,
      });
    } catch (error) {
      console.error(error);
      return res.status(404).json({
        status: "404",
        message: "Total account not found",
        error: error.message,
      });
    }
  };