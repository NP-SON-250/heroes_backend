import express from "express";
import {
  getLoggedInUserUnpaidAccounts,
  getLoggedInUserSingleUnpaid,
  deleteUnpaid
} from "../controllers/Heroes.unpaidaccounts.controllers";
import { normal } from "../middleware/middleware";

const unpaidAccountRoute = express.Router();
unpaidAccountRoute.get("/", normal, getLoggedInUserUnpaidAccounts);
unpaidAccountRoute.get("/:id", normal, getLoggedInUserSingleUnpaid);
unpaidAccountRoute.delete("/:id", deleteUnpaid);

export default unpaidAccountRoute;
