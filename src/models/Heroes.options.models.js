import mongoose from "mongoose";
const optionsSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: "questions" },
  text: { type: String },
  isCorrect: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const Options =
  mongoose.model.options || mongoose.model("options", optionsSchema);
export default Options;
