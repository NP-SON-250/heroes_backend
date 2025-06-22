import express from "express";
import {
  createOptions,
  updateOption,
  getAllOptions,
  getOptionById,
  deletsOption,
} from "../controllers/Heroes.options.controllers";
import fileUpload from "../helper/multer";
import { supperAdmins } from "../middleware/middleware";
const optionRoute = express.Router();
optionRoute.post("/:id", fileUpload.single("text"), createOptions);
optionRoute.put("/:id", fileUpload.single("text"), updateOption);
optionRoute.delete("/:id", supperAdmins, deletsOption);
optionRoute.get("/:question", getAllOptions);
optionRoute.get("/single/:id", getOptionById);

export default optionRoute;
