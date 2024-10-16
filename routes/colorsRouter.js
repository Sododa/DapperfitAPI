import express from "express";
import { isloggedin } from "../middlewares/isloggedin.js";
import { createColorCtrl, deleteColorCtrl, getallColorsCtrl, getSingleColorCtrl, updateColorCtrl } from "../controllers/colorsCtrl.js";

const colorRouter = express.Router();

colorRouter.post('/', isloggedin, createColorCtrl);
colorRouter.get('/', getallColorsCtrl);
colorRouter.get('/:id', getSingleColorCtrl);
colorRouter.delete('/:id',  deleteColorCtrl);
colorRouter.put('/:id', updateColorCtrl);
export default colorRouter;

