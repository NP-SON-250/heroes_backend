import mongoose from "mongoose";
const totalUserExamsSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "exams" },
  purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
});
const TotalUserExams =
  mongoose.model.totalUserExams || mongoose.model("totalUserExams", totalUserExamsSchema);
export default TotalUserExams;
