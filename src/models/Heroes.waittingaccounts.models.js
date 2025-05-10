import mongoose from "mongoose";
const waittingAccountsSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
});
const WaittingAccounts =
  mongoose.model.waittingAccounts || mongoose.model("waittingAccounts", waittingAccountsSchema);
export default WaittingAccounts;
