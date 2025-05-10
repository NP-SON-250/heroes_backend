import * as expiredAccountsServices from "../services/Congozi.expiredaccounts.services";

export const getLoggedInUserExpiredAccounts = async (req, res) => {
    try {
      const userId = req.loggedInUser.id;
      const expired = await expiredAccountsServices.getUserExpiredAccounts(userId);
  
      return res.status(200).json({
        status: "200",
        message: "Expired accounts retrieved",
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
      const {id} = req.params;
  
      const expired = await expiredAccountsServices.getSingleUserExpiredAccounts(userId, id);
  
      return res.status(200).json({
        status: "200",
        message: "Expired account retrieved",
        data: expired,
      });
    } catch (error) {
      console.error(error);
      return res.status(404).json({
        status: "404",
        message: "Expired account not found",
        error: error.message,
      });
    }
  };