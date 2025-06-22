import express from "express";
import {
  addResponses,
  getUserResponses,
  deleteResponse,
} from "../controllers/Heroes.responses.controllers";
import { normal, supperAdmins } from "../middleware/middleware";
const responsesRoute = express.Router();
responsesRoute.post("/add", normal, addResponses);
responsesRoute.get("/user", normal, getUserResponses);
responsesRoute.delete("/supper/{id}", supperAdmins, deleteResponse);
export default responsesRoute;
