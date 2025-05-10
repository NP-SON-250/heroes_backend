import express from "express";
import { getLoggedInUserUnpaidAccounts,getLoggedInUserSingleUnpaid } from "../controllers/Congozi.unpaidaccounts.controllers";
import { normal } from "../middleware/middleware";

const unpaidAccountRoute = express.Router();
unpaidAccountRoute.get("/", normal, getLoggedInUserUnpaidAccounts);
unpaidAccountRoute.get("/:id", normal, getLoggedInUserSingleUnpaid);

export default unpaidAccountRoute;
