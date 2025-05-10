import ExpiredAccounts from "../models/Congozi.expiredaccounts.models";

// Service to get all expired accounts for a logged-in user
export const getUserExpiredAccounts = async (userId) => {
  try {
    const accounts = await ExpiredAccounts.find({ purchasedBy: userId })
      .populate({
        path: "account",
      })
      .sort({ createdAt: -1 });

    return accounts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user expired accounts");
  }
};

// Service to get a single expired account for the logged-in user
export const getSingleUserExpiredAccounts = async (userId, id) => {
  try {
    const account = await ExpiredAccounts.findOne({
      _id: id,
      purchasedBy: userId,
    }).populate({
      path: "account",
    });

    if (!account) {
      throw new Error("Expired account not found or unauthorized access");
    }

    return account;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the expired account");
  }
};
