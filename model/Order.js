import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Generate random numbers for orders
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase
const randomNumbers = Math.floor(1000 + Math.random()*90000)
// blueprint schema
const OrderSchema = new Schema({
    //person placing the order
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // represent individual product
    orderItems:[
        {
            type: Object,
            required: true,
        },
    ],
    shippingAddress:{
        type: Object,
        required: true,
    },
    orderNumber:{
        type: String,
        default: randomTxt + randomNumbers,
    }, 
    //for stripe payment
    paymentStatus:{
        type: String,
        default:"Not Paid",
    },
    paymentMethod:{
        type: String,
        default: "Not Specified",
    },
    totalPrice:{
        type: Number,
        default: 0.0,
    },
    currency:{
        type: String,
        default:"Not Specified",
    },
    // used by admin
    status:{
        type: String,
        default: "Pending",
        enum:["Pending", "Processing", "Shipped","Delivered"]
    },
    deliveredAt:{
        type: Date,
    },
},
{
    timestamps: true,
}
);
// compile to form model
const Order = mongoose.model("Order", OrderSchema);
export default Order;