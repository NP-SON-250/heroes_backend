import express from "express";
import {
  getLoggedInUserUnpaidExams,
  getLoggedInUserSingleUnpaid,
} from "../controllers/Congozi.unpaidexams.controllers";
import { normal } from "../middleware/middleware";

const unpaidExamRoute = express.Router();
unpaidExamRoute.get("/", normal, getLoggedInUserUnpaidExams);
unpaidExamRoute.get("/:id", normal, getLoggedInUserSingleUnpaid);

export default unpaidExamRoute;
