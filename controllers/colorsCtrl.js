import asyncHandler from "express-async-handler";
import Color from "../model/color.js";


//creates new color
// POST /api/v1/color
// private admin creates

export const createColorCtrl = asyncHandler(async(req, res) => {
    // destructure properties about brand
    const {name} = req.body;
    // check if color exists
    const ColorFound = await Color.findOne({name})
    if (ColorFound){
        throw new Error("Color already Exists");
        
    }
    // otherwise create
    const color = await Color.create({
        name: name.toLowerCase(),
        user: req.userAuthId,

    });
    //send response
    res.json({
        status: "Success",
        message: "Color Created",
        Color,
    });
});
// get all Color
// GET /api/v1/Color
// acces public

export const getallColorsCtrl = asyncHandler(async(req, res) => {
    const color = await Color.find();
    res.json({
        status: "Success",
        message: "Color found",
        color,
    });
});
// get a single Color
// GET /api/v1/Color/:id
// acces public
export const getSingleColorCtrl = asyncHandler(async(req, res) => {
    const color = await Color.findById(req.params.id);
    res.json({
        status: "Success",
        message: "Color found",
        color,
    });
});
// update color
// GET /api/color/:id
// access private admin

export const updateColorCtrl = asyncHandler(async(req, res) => {
    const {name} = req.body;
    //update
    const brand = await Color.findByIdAndUpdate(req.params.id, 
        {name},
    {
        new: true,
    }
);
    res.json({
     status: "success",
     messege: "Color Update Successfull",
     Color,
    });
 });
  // deleting color
  // DELETE /api/color/:id
// access private admin
  export const deleteColorCtrl = asyncHandler(async(req, res) => {
    await Color.findByIdAndDelete(req.params.id);
    
    res.json({
        status: "success",
        messege: "Color deleted",
        
    });
 });
