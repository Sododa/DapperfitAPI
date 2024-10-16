import express from "express";
import { isloggedin } from "../middlewares/isloggedin.js";
import { createReviewCtrl } from "../controllers/ReviewsCtrl.js";


//instance of the router
const reviewRouter = express.Router();
reviewRouter.post("/:productID", isloggedin, createReviewCtrl);
export default reviewRouter;


