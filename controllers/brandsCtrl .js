import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

//creates new brand
// POST /api/v1/brand
// private admin creates

export const createBrandCtrl = asyncHandler(async(req, res) => {
    // destructure properties about brand
    const {name} = req.body;
    // check if brand exists
    const BrandFound = await Brand.findOne({name})
    if (BrandFound){
        throw new Error("Brand already Exists");
        
    }
    // otherwise create
    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthId,

    });
    //send response
    res.json({
        status: "Success",
        message: "Brand Created",
        Brand,
    });
});
// get all Brand
// GET /api/v1/brand
// acces public

export const getallBrandsCtrl = asyncHandler(async(req, res) => {
    const brands = await Brand.find();
    res.json({
        status: "Success",
        message: "Brand found",
        brands,
    });
});
// get a single brand
// GET /api/v1/brands/:id
// acces public
export const getSingleBrandCtrl = asyncHandler(async(req, res) => {
    const brand = await Brand.findById(req.params.id);
    res.json({
        status: "Success",
        message: "Brand found",
        brand,
    });
});
// update brand
// GET /api/brands/:id
// access private admin

export const updateBrandCtrl = asyncHandler(async(req, res) => {
    const {name} = req.body;
    //update
    const brand = await Brand.findByIdAndUpdate(req.params.id, 
        {name},
    {
        new: true,
    }
);
    res.json({
     status: "success",
     messege: "Brand Update Successfull",
    brand,
    });
 });
  // deleting brand
  // DELETE /api/brands/:id
// access private admin
  export const deleteBrandCtrl = asyncHandler(async(req, res) => {
    await Brand.findByIdAndDelete(req.params.id);
    
    res.json({
        status: "success",
        messege: "Brand deleted",
        
    });
 });
