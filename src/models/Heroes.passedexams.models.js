import mongoose from "mongoose";
const passedExamsSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "exams" },
  purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
});
const PassedExams =
  mongoose.model.passedExams || mongoose.model("passedExams", passedExamsSchema);
export default PassedExams;
