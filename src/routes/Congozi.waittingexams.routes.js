import express from "express";
import { getLoggedInUserWaittingExams, getLoggedInUserSingleWaitting } from "../controllers/Congozi.waittingexams.controllers";
import { normal } from "../middleware/middleware";

const waittingExamRoute = express.Router();
waittingExamRoute.get("/", normal, getLoggedInUserWaittingExams);
waittingExamRoute.get("/:id", normal, getLoggedInUserSingleWaitting);

export default waittingExamRoute;
