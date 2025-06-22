import mongoose from "mongoose";
const notifySchema = new mongoose.Schema({
  notifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  ownerName: { type: String },
  noteTitle: { type: String },
  purchasedItem: { type: mongoose.Schema.Types.ObjectId, ref: "purchases" },
  message: { type: String },
  status: {
    type: String,
    enum: ["Under Review", "Access Granted"],
    default: "Under Review",
  },
  isRead: {
    type: String,
    enum: ["Yes", "No"],
    default: "No",
  },
  createdAt: { type: Date, default: Date.now },
});
const Notify =
  mongoose.model.notifications || mongoose.model("notifications", notifySchema);
export default Notify;
