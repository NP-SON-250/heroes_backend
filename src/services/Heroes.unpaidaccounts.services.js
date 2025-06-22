import UnpaidAccounts from "../models/Heroes.unpaidaccounts.models";

export const getUserUnpaidAccounts = async (userId) => {
  try {
    const accounts = await UnpaidAccounts.find({ purchasedBy: userId })
      .populate({
        path: "account",
      })
      .sort({ createdAt: -1 });

    return accounts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user unpaid accounts");
  }
};

export const getSingleUserUnpaidAccounts = async (userId, id) => {
  try {
    const account = await UnpaidAccounts.findOne({
      _id: id,
      purchasedBy: userId,
    }).populate({
      path: "account",
    });

    if (!account) {
      throw new Error("Unpaid account not found or unauthorized access");
    }

    return account;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve the unpaid account");
  }
};
