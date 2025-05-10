import express from "express";
import {
  getLoggedInUserExpiredExams,
  getLoggedInUserSingleExpired,
} from "../controllers/Congozi.expiredexams.controllers";
import { normal } from "../middleware/middleware";

const expiredExamRoute = express.Router();
expiredExamRoute.get("/", normal, getLoggedInUserExpiredExams);
expiredExamRoute.get("/:id", normal, getLoggedInUserSingleExpired);

export default expiredExamRoute;
