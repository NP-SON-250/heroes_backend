import express from "express";
import docrouter from "../docs/Docs";
import userRoute from "./Congozi.users.routes";
import examRoute from "./Congozi.exams.routes";
import questionRoute from "./Congozi.questions.routes";
import optionRoute from "./Congozi.options.routes";
import accountRoute from "./Congozi.accounts.routes";
import purchaseRoute from "./Congozi.purchases.routes";
import unpaidExamRoute from "./Congozi.unpaidexams.routes";
import unpaidAccountRoute from "./Congozi.unpaidaccounts.routes";
import totaluserAccountRoute from "./Congozi.totaluseraccounts.routes";
import totaluserExamRoute from "./Congozi.totaluserexams.routes";
import passedExamRoute from "./Congozi.passedexams.routes";
import failedExamRoute from "./Congozi.failledexams.routes";
import expiredExamRoute from "./Congozi.expiredexams.routes";
import expiredAccountRoute from "./Congozi.expiredaccounts.routes";
import waittingAccountRoute from "./Congozi.waittingaccounts.routes";
import waittingExamRoute from "./Congozi.waittingexams.routes";
import responsesRoute from "./Congozi.responses.routes";
import iremboRoute from "./Congozi.irembo.routes";
const router = express.Router();

// Route

router.use("/docs", docrouter);
router.use("/users", userRoute);
router.use("/exams", examRoute);
router.use("/questions", questionRoute);
router.use("/options", optionRoute);
router.use("/accounts", accountRoute);
router.use("/purchases", purchaseRoute);
router.use("/unpaidexams", unpaidExamRoute);
router.use("/unpaidaccounts", unpaidAccountRoute);
router.use("/totaluseraccounts", totaluserAccountRoute);
router.use("/totaluserexams", totaluserExamRoute);

router.use("/passedexams", passedExamRoute);
router.use("/failledexams", failedExamRoute);
router.use("/expiredexams", expiredExamRoute);
router.use("/waittingexams", waittingExamRoute);
router.use("/waittingaccounts", waittingAccountRoute);
router.use("/expiredaccounts", expiredAccountRoute);
router.use("/responses", responsesRoute);
router.use("/irembo", iremboRoute);












export default router;
