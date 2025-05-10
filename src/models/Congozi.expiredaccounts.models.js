import mongoose from "mongoose";
const expiredAccountsSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
});
const ExpiredAccounts =
  mongoose.model.expiredAccounts ||
  mongoose.model("expiredAccounts", expiredAccountsSchema);
export default ExpiredAccounts;
