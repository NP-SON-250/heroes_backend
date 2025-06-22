import express from "express";
import {
  createAccount,
  updateAccount,
  getAllAccount,
  getAccountById,
  deleteAccount,
  getCurrentWeekAccountsCount,
  getLastWeekAccountsCount,
} from "../controllers/Heroes.accounts.controllers";
import fileUpload from "../helper/multer";
import { admins, supperAdmins } from "../middleware/middleware";

const accountRoute = express.Router();
accountRoute.get("/last-week", getLastWeekAccountsCount);
accountRoute.get("/current-week", getCurrentWeekAccountsCount);
accountRoute.post("/", fileUpload.single("title"), createAccount);
accountRoute.put("/:id", fileUpload.single("title"), updateAccount);
accountRoute.delete("/:id", supperAdmins, deleteAccount);
accountRoute.get("/", getAllAccount);
accountRoute.get("/:id", getAccountById);

export default accountRoute;
