import express from "express";
import { createCategoryCtrl, deleteCategoryCtrl, getallCategoriesCtrl, getSingleCategoryCtrl, updateCategoryCtrl } from "../controllers/categoriesCtrl.js";
import { isloggedin } from "../middlewares/isloggedin.js";

const categoriesRouter = express.Router();
categoriesRouter.post('/', isloggedin, createCategoryCtrl);
categoriesRouter.get('/', getallCategoriesCtrl);
categoriesRouter.get('/:id', getSingleCategoryCtrl);
categoriesRouter.delete('/:id',  deleteCategoryCtrl);
categoriesRouter.put('/:id', updateCategoryCtrl);
export default categoriesRouter;

