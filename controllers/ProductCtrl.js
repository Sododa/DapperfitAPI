import asyncHandler from "express-async-handler";
import Product from "../model/Products.js";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js";

// description to create new products
// route to follow is /api/v1/products
// access is private for Admin
export const createProductCtrl =  asyncHandler( async(req, res) => {
    const {
        name,
        description, 
        category,
        sizes,
        colors,
        price,
        totalQty,
        brand,
    } = req.body;
      // finding if product exists
      const productExists = await Product.findOne({ name});
      if (productExists){
          throw new Error ("Product Already Exists");
      }
   
    //find the brand
    const brandFound = await Brand.findOne({
        name: brand.toLowerCase(),
    });
    // no category we are returning an error please provide right category
    if(!brandFound){
        throw new Error(
            "brand not Found, create brand or check the brand name"
        );
    }

    //find the category
    const categoryFound = await Category.findOne({
        name: category,
    });
    // no category we are returning an error please provide right category
    if(!categoryFound){
        throw new Error(
            "Category not Found, create category or check the category name"
        );
    }

    // otherwise create product
    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price, 
        totalQty,
        brand, 
    });
    
    // pushing the products into category
    categoryFound.products.push(product._id);
    // resave
    await categoryFound.save();

    // pushing the product into brand
    brandFound.products.push(product._id);
    // resave
    await brandFound.save();
    // send response 
    res.json({
        status: "success",
        message: "product successfully created",
        product,
    });
});
// to get all products
export const getProductsCtrl = asyncHandler(async (req, res) =>{
    console.log(req.query);
    
    // declaring variable query
    let productQuery = Product.find();
    // await the Query
   
    // searching product by name
    if(req.query.name){
        productQuery = productQuery.find({
            name: { $regex: req.query.name, $options: "i" },
        });
    }
    // filtering by brand
    if(req.query.brand){
        productQuery = productQuery.find({
            brand: { $regex: req.query.brand, $options: "i" },
        });
    }
    // filtering by category
    if(req.query.category){
        productQuery = productQuery.find({
            category: { $regex: req.query.category, $options: "i" },
        });
    }
    // filtering by colors
    if(req.query.colors){
        productQuery = productQuery.find({
            colors: { $regex: req.query.colors, $options: "i" },
        });
    }
     // filtering by sizes
     if(req.query.sizes){
        productQuery = productQuery.find({
            sizes: { $regex: req.query.sizes, $options: "i" },
        });
    }
    //filtering by price range
    if(req.query.price){
        const priceRange = req.query.price.split("-");
        // using mongodb gte: greater than or equal to 
        // lte: less than or equal to
        productQuery = productQuery.find({
            price:{ $gte: priceRange[0], $lte: priceRange[1] },
        });
    }
    // implementing pagination
    // you must have a page before
    const page = parseInt(req.query.page) ? parseInt(req.query.page): 1;
    // limits : how many records of data to return or dislay
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit): 10;
    // we will have a start index
    const startIndex = (page -1) * limit;
    // end index
    const endIndex = page * limit;
    // total products
    const total = await Product.countDocuments()
    productQuery =productQuery.skip(startIndex).limit(limit);
    // pagination results for users
    const pagination ={};
    if(endIndex < total){
        pagination.next = {
            page: page + 1,
            limit,
        };
    }
    if(startIndex > 0){
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }
    // await the Query
     const products = await productQuery.populate("reviews");
res.json({
    status: "success",
    total,
    results: products.length,
    pagination,
    message: "Product Found Successfully",
    products 
});
});
// getting single product
// GET /api/v1/products api products
// accessed by public
 export const getProductCtrl = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id).populate("reviews");
    // check if there is no product
    if(!product) {
        throw new Error ('No Product');
    }
    res.json({
        status: "success",
        messege: "Product Found Successfully",
        product,
    });
 });
 // updating product
// PUT /api/v1/products/:id/update
// accessed by private/admin
export const updateProductCtrl = asyncHandler(async(req, res) => {
    const {
        name,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty,
        brand,
    } = req.body;
    //update
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty,
        brand,
    },
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

 // deleting products
 export const deleteProductCtrl = asyncHandler(async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    
    res.json({
        status: "success",
        messege: "Product deleted",
        
    });
 });
 
 // DELETE /api/v1/products/:id/delete
 // access is admin private