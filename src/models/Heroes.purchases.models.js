import mongoose from "mongoose";
const purchasesSchema = new mongoose.Schema({
  itemType: { type: String, enum: ["exams", "accounts"] },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "itemType",
  },
  purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  amount: { type: String },
  accessCode: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "complete","waitingConfirmation", "expired"],
    default: "pending",
  },
});
const Purchases =
  mongoose.model.purchases || mongoose.model("purchases", purchasesSchema);
export default Purchases;
