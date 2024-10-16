import asyncHandler from "express-async-handler"
import Category from "../model/Category.js";

//creates new categories
// POST /api/v1/categories
// private admin creates

export const createCategoryCtrl = asyncHandler(async(req, res) => {
    // destructure properties about categories
    const {name} = req.body;
    // check if category exists
    const categoryFound = await Category.findOne({name})
    if (categoryFound){
        throw new Error("Category already Exists");
        
    }
    // otherwise create
    const category = await Category.create({
        name: name.toLowerCase(),
        user: req.userAuthId,

    });
    //send response
    res.json({
        status: "Success",
        message: "Category Created",
        Category,
    });
});
// get all categories
// GET /api/v1/categories
// acces public

export const getallCategoriesCtrl = asyncHandler(async(req, res) => {
    const categories = await Category.find();
    res.json({
        status: "Success",
        message: "Categories found",
        categories,
    });
});
// get a single category
// GET /api/v1/categories
// acces public
export const getSingleCategoryCtrl = asyncHandler(async(req, res) => {
    const category = await Category.findById(req.params.id);
    res.json({
        status: "Success",
        message: "Category found",
        category,
    });
});
// update categories
// GET /api/categories/:id
// access private admin

export const updateCategoryCtrl = asyncHandler(async(req, res) => {
    const {name} = req.body;
    //update
    const category = await Category.findByIdAndUpdate(req.params.id, 
        {name},
    {
        new: true,
    }
);
    res.json({
     status: "success",
     messege: "Product Update Successfull",
    product,
    });
 });
  // deleting categories
  // DELETE /api/categories/:id
// access private admin
  export const deleteCategoryCtrl = asyncHandler(async(req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    
    res.json({
        status: "success",
        messege: "Category deleted",
        
    });
 });
