import express from "express";
import { 
    updateQuestion,
    getAllQuestions,
    getQuestionById,
    deletsQuestion,
    createQuestions
 } from "../controllers/Congozi.questions.controllers";
import fileUpload from "../helper/multer";

const questionRoute = express.Router();
questionRoute.post("/:id", fileUpload.single("image"), createQuestions);
questionRoute.put("/:id", fileUpload.single("image"), updateQuestion);
questionRoute.delete("/:id", deletsQuestion);
questionRoute.get("/:exam", getAllQuestions);
questionRoute.get("/single/:id", getQuestionById);

export default questionRoute;
