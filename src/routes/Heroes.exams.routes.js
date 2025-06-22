import express from "express";
import {
  createExamination,
  updateExam,
  getAllExams,
  getExamById,
  deleteExam,
  getExamNumber,
  getCurrentWeekExamsCount,
  getLastWeekExamsCount,
} from "../controllers/Heroes.exams.controllers";
import fileUpload from "../helper/multer";
import { supperAdmins } from "../middleware/middleware";

const examRoute = express.Router();

// Static routes first
examRoute.get("/last-week", getLastWeekExamsCount);
examRoute.get("/current-week", getCurrentWeekExamsCount);
examRoute.get("/kora/:number", getExamNumber); 

// CRUD operations
examRoute.post("/", fileUpload.single("title"), createExamination);
examRoute.get("/", getAllExams);

// Dynamic routes last
examRoute.put("/:id", fileUpload.single("title"), updateExam);
examRoute.get("/:id", getExamById);
examRoute.delete("/:id", supperAdmins, deleteExam);

export default examRoute;
