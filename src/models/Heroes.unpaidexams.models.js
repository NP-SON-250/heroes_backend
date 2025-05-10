import mongoose from "mongoose";
const unpaidExamsSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "exams" },
  purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
});
const UnpaidExams =
  mongoose.model.unpaidExams || mongoose.model("unpaidExams", unpaidExamsSchema);
export default UnpaidExams;
