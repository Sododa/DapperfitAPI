import asyncHandler from "express-async-handler";
import Product from "../model/Products.js";
import Review from "../model/Review.js";

//create a new review
// post /api/v1/reviews
//private admin
export const createReviewCtrl = asyncHandler(async(req, res) => {
    const {product, message,rating} = req.body;
    // find the product we want toreview and we find it
    const {productID} = req.params;
    const productFound = await Product.findById(productID).populate("reviews");
    if(!productFound){
        throw new Error('Product Not Found');
    }
    /// has reviewed
    const hasReviewed = productFound?.reviews?.find((review) =>{
        return review?.user?.toString() === req?.userAuthId?.toString();
    });
    if (hasReviewed){
        throw new Error("you have already Reviewed");
    }
    
    // by id in the params
    // check if user already viewed the product
    // create a review
    const  review = await Review.create({
        message,
        rating,
        product: productFound?._id,
        user: req.userAuthId,
    });
    //push review into product Found
    productFound.reviews.push(review?._id)
    // resave
    await productFound.save();
    res.status(201).json({
        success: true,
        message: "Review created",
    });
    
});