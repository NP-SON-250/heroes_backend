import express from "express";
import {
  getLoggedInUserUnpaidExams,
  getLoggedInUserSingleUnpaid,
  deleteUnpaid,
} from "../controllers/Heroes.unpaidexams.controllers";
import { normal } from "../middleware/middleware";

const unpaidExamRoute = express.Router();
unpaidExamRoute.get("/", normal, getLoggedInUserUnpaidExams);
unpaidExamRoute.get("/:id", normal, getLoggedInUserSingleUnpaid);
unpaidExamRoute.delete("/:id", deleteUnpaid);

export default unpaidExamRoute;
