import TotalUserAccounts from "../models/Congozi.totaluseraccounts.models";

// Service to get all total user accounts for a logged-in user
export const getTotalUserAccounts = async (userId) => {
  try {
    const accounts = await TotalUserAccounts.find({ purchasedBy: userId })
      .populate({
        path: "account",
      })
      .sort({ createdAt: -1 });

    return accounts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve total user accounts");
  }
};

// Service to get a single total user account for the logged-in user
export const getSingleTotalUserAccounts = async (userId, id) => {
  try {
    const account = await TotalUserAccounts.findOne({
      _id: id,
      purchasedBy: userId,
    }).populate({
      path: "accounts",
    });

    if (!account) {
      throw new Error("Total user account not found or unauthorized access");
    }

    return account;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the total user account");
  }
};
