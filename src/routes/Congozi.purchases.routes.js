import express from "express";
import {
  purchasedItem,
  getUserPending,
  getUserAdmin,
  getUserComplete,
  getLoggedInUserSinglePurchase,
  deleteLoggedInUserPurchase,
  updatedPurchase,
  examByCode,
  purchasedAndPaidItem,
  getUserPurchase,
  deleteAccessCodePurchase,
} from "../controllers/Congozi.purchases.controllers";
import fileUpload from "../helper/multer";
import { admins, students, schools, normal } from "../middleware/middleware";

const purchaseRoute = express.Router();

// GET routes
purchaseRoute.get("/access/:code", normal, examByCode);
purchaseRoute.get("/pending", normal, getUserPending);
purchaseRoute.get("/complete", normal, getUserComplete);
purchaseRoute.get("/user", normal, getUserPurchase);
purchaseRoute.get("/:purchaseId", normal, getLoggedInUserSinglePurchase);
purchaseRoute.get("/", normal, getUserAdmin);

// POST routes
purchaseRoute.post(
  "/paid/:itemId",
  fileUpload.single("status"),
  normal,
  purchasedAndPaidItem
);
purchaseRoute.post(
  "/:itemId",
  fileUpload.single("status"),
  normal,
  purchasedItem
);

// PUT route
purchaseRoute.put("/:id", fileUpload.single("status"), updatedPurchase);

// DELETE route
purchaseRoute.delete("/:purchaseId", normal, deleteLoggedInUserPurchase);
purchaseRoute.delete("/access/:accessCode", deleteAccessCodePurchase);

export default purchaseRoute;
