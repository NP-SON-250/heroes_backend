import mongoose from "mongoose";
const examsSchema = new mongoose.Schema({
  title: { type: String },
  type: {
    type: String,
    enum: ["gukora", "kwiga"],
    default: "kwiga",
  },
  number: { type: String },
  fees: { type: String },
  questions: [{ type: mongoose.Schema.ObjectId, ref: "questions" }],
  createdAt: { type: Date, default: Date.now },
});
const Exams = mongoose.model.exams || mongoose.model("exams", examsSchema);
export default Exams;
