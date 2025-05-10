import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
  fName: { type: String },
  lName: { type: String },
  idCard: { type: String, unique: true },
  address: { type: String },
  phone: { type: String, unique: true },
  companyName: { type: String },
  tin: { type: String },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  role: {
    type: String,
    enum: ["student", "admin", "school"],
    default: "student",
  },
  purchasedExams: [{ type: mongoose.Schema.ObjectId, ref: "exams" }],
  purchasedAccounts: [{ type: mongoose.Schema.ObjectId, ref: "accounts" }],
  createdAt: { type: Date, default: Date.now },
});

const Users = mongoose.models.users || mongoose.model("users", usersSchema);

export default Users;
