import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Products.js";
import Stripe from "stripe";

// create Order
// stripe
// STRIPE instance
const stripe = new Stripe(process.env.STRIPE_KEY);
// create Order
// Post /api/v1/0rders
// access private admin
export const createOrderCtrl = asyncHandler(async(req, res)=>{
    // get the payload(costomr order items shipping adress then total price)
    const {orderItems, shippingAddress, totalPrice} = req.body;
    
    // find the user
   const user = await User.findById(req.userAuthId);
   //check if user has shipping address
   if(!user?.hasShippingAddress){
    throw new Error("Please provide Shipping Adress");

   }
   // check if order is  empty
   if(orderItems?.length <= 0){
    throw new Error("No Orders");
   }
   // place the order  create and place it in database
   const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
   });
   // push order into user
   user.orders.push(order?._id);
   await user.save();
   // updating product quantity and product sold
   const products = await Product.find({_id: { $in:orderItems}});
   orderItems?.map(async (order)=>{
    // find a product by the id inside order
    const product = products?.find((product)=>{
        return product?._id.toString() === order?._id.toString();
    });
    if(product){
        product.totalSold += order.qty;
    }
    await product.save();
});
// push order into user
user.orders.push(order?._id);
await user.save();
   // make payment with stripe 
const convertedOrders = orderItems.map((item) => {
    // pass in accepable properties
    return {
        price_data: {
            currency:"usd",
            product_data: {
                name: item?.name,
                description: item?.description,
            },
            unit_amount: item?.price * 10,
        },
        quantity: item?.qty,
    };
});
const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata:{
        orderId: JSON.stringify(order?._id),
    },
    mode: "payment",
    success_url: "http://localhost:5000/success",
    cancel_url: "https://localhost:5000/cancelled",
});
res.send({url: session.url});
});
// feting all orders
// get /api/v1/orders
// private by admin
export const getallordersCtrl = asyncHandler(async(req, res)=> {
    // finding all orders
    const orders = await Order.find();
    res.json({
        success : true,
        message: "Our Orders",
        orders,
    }); 
});
// feching single orders
// get /api/v1/orders/:Id
// private by admin 
export const getSingleOrderCtrl = asyncHandler(async(req, res) =>{
    //id params
    const id = req.params.id;
    const order = await Order.findById(id);
    // if order found send the response
    res.status(200).json({
        success: true,
        message: "Found Order",
        order,
    });
});
   
   // update order from pending to delivered;
   // Put /api/v1/otrders/:id/delivered
   // acces is by the admin
export const updateOrderCtrl = asyncHandler(async(req, res)=> {
    // get request parameters
    const id = req.params.id;
    // update order request
    const updatedOrder = await Order.findByIdAndUpdate(id,{
        status: req.body.status,
    },
    {
        new: true,
    },
);
res.status(200).json({
    success: true,
    message: "Found Delivered",
    updatedOrder,
});

   });


