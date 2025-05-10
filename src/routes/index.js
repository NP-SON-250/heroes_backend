import express from "express";
import docrouter from "../docs/Docs";
import userRoute from "./Heroes.users.routes";
import examRoute from "./Heroes.exams.routes";
import questionRoute from "./Heroes.questions.routes";
import optionRoute from "./Heroes.options.routes";
import accountRoute from "./Heroes.accounts.routes";
import purchaseRoute from "./Heroes.purchases.routes";
import unpaidExamRoute from "./Heroes.unpaidexams.routes";
import unpaidAccountRoute from "./Heroes.unpaidaccounts.routes";
import totaluserAccountRoute from "./Heroes.totaluseraccounts.routes";
import totaluserExamRoute from "./Heroes.totaluserexams.routes";
import passedExamRoute from "./Heroes.passedexams.routes";
import failedExamRoute from "./Heroes.failledexams.routes";
import expiredExamRoute from "./Heroes.expiredexams.routes";
import expiredAccountRoute from "./Heroes.expiredaccounts.routes";
import waittingAccountRoute from "./Heroes.waittingaccounts.routes";
import waittingExamRoute from "./Heroes.waittingexams.routes";
import responsesRoute from "./Heroes.responses.routes";
import iremboRoute from "./Heroes.irembo.routes";
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
