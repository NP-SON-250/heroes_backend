import express from "express";
import { getLoggedInUserFailledExams,getLoggedInUserSingleFailled } from "../controllers/Congozi.failledexams.controllers";
import { normal } from "../middleware/middleware";

const failedExamRoute = express.Router();
failedExamRoute.get("/", normal, getLoggedInUserFailledExams);
failedExamRoute.get("/:id", normal, getLoggedInUserSingleFailled);

export default failedExamRoute;
