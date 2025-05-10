import mongoose from "mongoose";
const questionsSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "exams" },
  phrase: { type: String },
  marks: { type: Number },
  image: { type: String },
  options: [{ type: mongoose.Schema.ObjectId, ref: "options" }],
  createdAt: { type: Date, default: Date.now },
});
const Questions = mongoose.model.questions || mongoose.model("questions", questionsSchema);
export default Questions;
