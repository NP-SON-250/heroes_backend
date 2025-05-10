import express from "express";
import {
  getLoggedInTotalUserExams,
  getLoggedInSingleTotalUserExams,
} from "../controllers/Congozi.totaluserexams.controllers";
import { normal } from "../middleware/middleware";

const totaluserExamRoute = express.Router();
totaluserExamRoute.get("/", normal, getLoggedInTotalUserExams);
totaluserExamRoute.get("/:id", normal, getLoggedInSingleTotalUserExams);

export default totaluserExamRoute;
