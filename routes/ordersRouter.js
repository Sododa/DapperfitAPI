import express from "express"
import { createOrderCtrl, getallordersCtrl, getSingleOrderCtrl, updateOrderCtrl} from "../controllers/orderCtrl.js";
import { isloggedin } from "../middlewares/isloggedin.js";

const orderRouter = express.Router();
// create order
orderRouter.post("/",isloggedin, createOrderCtrl);
orderRouter.get("/",isloggedin, getallordersCtrl);
orderRouter.put("/update/:id", isloggedin, updateOrderCtrl);
orderRouter.get("/:id",isloggedin, getSingleOrderCtrl);
export default orderRouter;