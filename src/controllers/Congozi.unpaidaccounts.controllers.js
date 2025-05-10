import * as unpaidAccountsServices from "../services/Congozi.unpaidaccounts.services";

export const getLoggedInUserUnpaidAccounts = async (req, res) => {
    try {
      const userId = req.loggedInUser.id;
      const unpaid = await unpaidAccountsServices.getUserUnpaidAccounts(userId);
  
      return res.status(200).json({
        status: "200",
        message: "Unpaid accounts retrieved",
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
      const {id} = req.params;
  
      const unpaid = await unpaidAccountsServices.getSingleUserUnpaidAccounts(userId, id);
  
      return res.status(200).json({
        status: "200",
        message: "Unpaid account retrieved",
        data: unpaid,
      });
    } catch (error) {
      console.error(error);
      return res.status(404).json({
        status: "404",
        message: "Unpaid account not found",
        error: error.message,
      });
    }
  };