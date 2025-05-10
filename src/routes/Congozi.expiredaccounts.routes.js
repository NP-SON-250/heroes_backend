import express from "express";
import { getLoggedInUserExpiredAccounts,getLoggedInUserSingleExpired } from "../controllers/Congozi.expiredaccounts.controllers";
import { normal } from "../middleware/middleware";

const expiredAccountRoute = express.Router();
expiredAccountRoute.get("/", normal, getLoggedInUserExpiredAccounts);
expiredAccountRoute.get("/:id", normal, getLoggedInUserSingleExpired);

export default expiredAccountRoute;
