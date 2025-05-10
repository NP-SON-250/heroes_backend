import mongoose from "mongoose";
const accountsSchema = new mongoose.Schema({
  title: { type: String },
  fees: { type: String },
  validIn: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const Accounts =
  mongoose.model.accounts || mongoose.model("accounts", accountsSchema);
export default Accounts;
