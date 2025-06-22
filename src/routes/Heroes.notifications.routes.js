import express from "express";
import { normal } from "../middleware/middleware";
import {
  createNote,
  allData,
  singleData,
  deleteNote,
} from "../controllers/Heroes.notify.controllers";
const notificationsRoute = express.Router();
notificationsRoute.post("/", normal, createNote);
notificationsRoute.get("/all", normal, allData);
notificationsRoute.get("/:id", normal, singleData);
notificationsRoute.delete("/mark/:id", normal, deleteNote);

export default notificationsRoute;
