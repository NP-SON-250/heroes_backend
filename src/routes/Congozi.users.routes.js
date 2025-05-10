import express from "express";
import {
  login,
  loginSchools,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  createUsers
} from "../controllers/Congozi.users.controllers";
import fileUpload from "../helper/multer";

const userRoute = express.Router();
userRoute.post("/", fileUpload.single("profile"), createUsers);
userRoute.post("/auth", fileUpload.single("password"), login);
userRoute.post("/auth/school", fileUpload.single("password"), loginSchools);
userRoute.put("/:id", fileUpload.single("profile"), updateUser);
userRoute.delete("/:id", deleteUser);
userRoute.get("/", getAllUsers);
userRoute.get("/:id", getUserById);

export default userRoute;
