import express from "express";
import {
  createExamination,
  updateExam,
  getAllExams,
  getExamById,
  deleteExam,
  getExamNumber
} from "../controllers/Congozi.exams.controllers";
import fileUpload from "../helper/multer";
import { admins } from "../middleware/middleware";

const examRoute = express.Router();
examRoute.post("/", fileUpload.single("title"), createExamination);
examRoute.put("/:id", fileUpload.single("title"), updateExam);
examRoute.delete("/:id", deleteExam);
examRoute.get("/", getAllExams);
examRoute.get("/:id", getExamById);
examRoute.get("/test/:number", getExamNumber);

export default examRoute;
