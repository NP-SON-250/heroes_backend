import express from "express";
import {
  login,
  loginSchools,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  createUsers,
} from "../controllers/Heroes.users.controllers";
import fileUpload from "../helper/multer";
import Users from "../models/Heroes.users.model";
import { normal } from "../middleware/middleware";
import bcrypt from "bcrypt";
const userRoute = express.Router();
userRoute.post("/", fileUpload.single("profile"), createUsers);
userRoute.post("/auth", fileUpload.single("password"), login);
userRoute.post("/auth/school", fileUpload.single("password"), loginSchools);
userRoute.post("/verify-password", normal, async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const user = await Users.findById(userId);
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
userRoute.put("/:id", fileUpload.single("profile"), updateUser);
userRoute.delete("/:id", deleteUser);
userRoute.get("/", getAllUsers);
userRoute.get("/:id", getUserById);

export default userRoute;
