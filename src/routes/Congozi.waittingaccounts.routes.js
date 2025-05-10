import express from "express";
import { getLoggedInUserWaittingAccounts, getLoggedInUserSingleWaitting } from "../controllers/Congozi.waittingaccounts.controllers";
import { normal } from "../middleware/middleware";

const waittingAccountRoute = express.Router();
waittingAccountRoute.get("/", normal, getLoggedInUserWaittingAccounts);
waittingAccountRoute.get("/:id", normal, getLoggedInUserSingleWaitting);

export default waittingAccountRoute;
