import express from "express";
import {
  login,
  loginSchools,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  createUsers,
  getLastWeekUsersCount,
  getCurrentWeekUsersCount,
} from "../controllers/Heroes.users.controllers";
import fileUpload from "../helper/multer";
import Users from "../models/Heroes.users.model";
import { normal } from "../middleware/middleware";
import bcrypt from "bcrypt";

const userRoute = express.Router();

// Static routes first
userRoute.get("/last-week", getLastWeekUsersCount);
userRoute.get("/current-week", getCurrentWeekUsersCount); 
userRoute.get("/", getAllUsers);

// Authentication routes
userRoute.post("/auth/school", fileUpload.single("password"), loginSchools);
userRoute.post("/auth", fileUpload.single("password"), login);

// Password verification
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

// CRUD operations
userRoute.post("/", fileUpload.single("profile"), createUsers);
userRoute.put("/:id", fileUpload.single("profile"), updateUser);
userRoute.delete("/:id", deleteUser);

// Parameterized routes last
userRoute.get("/:id", getUserById);

export default userRoute;
