import express from "express";
import {
  getLoggedInTotalUserAccounts,
  getLoggedInSingleTotalUserAccounts,
} from "../controllers/Congozi.totaluseraccount.controllers";
import { normal } from "../middleware/middleware";

const totaluserAccountRoute = express.Router();
totaluserAccountRoute.get("/", normal, getLoggedInTotalUserAccounts);
totaluserAccountRoute.get("/:id", normal, getLoggedInSingleTotalUserAccounts);

export default totaluserAccountRoute;
