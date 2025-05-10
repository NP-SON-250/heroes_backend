import express from "express";
import { 
  createAccount,
  updateAccount,
  getAllAccount,
  getAccountById,
  deleteAccount

 } from "../controllers/Congozi.accounts.controllers";
import fileUpload from "../helper/multer";
import { admins } from "../middleware/middleware";

const accountRoute = express.Router();
accountRoute.post("/", fileUpload.single("title"), createAccount);
accountRoute.put("/:id", fileUpload.single("title"), updateAccount);
accountRoute.delete("/:id", deleteAccount);
accountRoute.get("/", getAllAccount);
accountRoute.get("/:id", getAccountById);

export default accountRoute;
