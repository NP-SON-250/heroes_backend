import ExpiredAccounts from "../models/Heroes.expiredaccounts.models";

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
