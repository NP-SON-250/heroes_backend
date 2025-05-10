import express from "express";
import {
  getLoggedInUserPassedExams,
  getLoggedInUserSinglePassed,
} from "../controllers/Congozi.passedexams.controllers";
import { normal } from "../middleware/middleware";

const passedExamRoute = express.Router();
passedExamRoute.get("/", normal, getLoggedInUserPassedExams);
passedExamRoute.get("/:id", normal, getLoggedInUserSinglePassed);

export default passedExamRoute;
