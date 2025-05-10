import express from "express";
import { 
    createOptions,
    updateOption,
    getAllOptions,
    getOptionById,
    deletsOption,
 } from "../controllers/Congozi.options.controllers";
import fileUpload from "../helper/multer";

const optionRoute = express.Router();
optionRoute.post("/:id", fileUpload.single("text"), createOptions);
optionRoute.put("/:id", fileUpload.single("text"), updateOption);
optionRoute.delete("/:id", deletsOption);
optionRoute.get("/:question", getAllOptions);
optionRoute.get("/single/:id", getOptionById);

export default optionRoute;
