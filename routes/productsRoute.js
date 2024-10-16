import express from "express"
import { createProductCtrl, deleteProductCtrl, getProductCtrl, getProductsCtrl, updateProductCtrl } from "../controllers/ProductCtrl.js"
import { isloggedin } from "../middlewares/isloggedin.js";

const productsRouter = express.Router();

productsRouter.post("/" ,isloggedin, createProductCtrl);
productsRouter.get("/" , getProductsCtrl);
productsRouter.get("/:id" , getProductCtrl);
productsRouter.put("/:id" , isloggedin, updateProductCtrl);
productsRouter.delete("/:id/delete" , isloggedin, deleteProductCtrl);
export default productsRouter;