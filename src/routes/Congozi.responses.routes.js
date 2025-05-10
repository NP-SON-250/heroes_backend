import express from "express";
import {
  addResponses,
  getUserResponses,
} from "../controllers/Congozi.responses.controllers";
import fileUpload from "../helper/multer";
import { normal } from "../middleware/middleware";
const responsesRoute = express.Router();
responsesRoute.post("/add", normal, addResponses);
responsesRoute.get("/user", normal, getUserResponses);
export default responsesRoute;
