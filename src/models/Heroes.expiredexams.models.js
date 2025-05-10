import mongoose from "mongoose";
const expiredExamsSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "exams" },
  purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
});
const ExpiredExams =
  mongoose.model.expiredExams ||
  mongoose.model("expiredExams", expiredExamsSchema);
export default ExpiredExams;
