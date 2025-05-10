import mongoose from "mongoose";
const unpaidAccountsSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
});
const UnpaidAccounts =
  mongoose.model.unpaidAccounts || mongoose.model("unpaidAccounts", unpaidAccountsSchema);
export default UnpaidAccounts;
