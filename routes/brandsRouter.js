import express from "express";
import { createBrandCtrl, deleteBrandCtrl, getallBrandsCtrl, getSingleBrandCtrl, updateBrandCtrl } from "../controllers/brandsCtrl .js";
import { isloggedin } from "../middlewares/isloggedin.js";


const brandsRouter = express.Router();

brandsRouter.post('/', isloggedin, createBrandCtrl);
brandsRouter.get('/', getallBrandsCtrl);
brandsRouter.get('/:id', getSingleBrandCtrl);
brandsRouter.delete('/:id',  deleteBrandCtrl);
brandsRouter.put('/:id', updateBrandCtrl);
export default brandsRouter;

