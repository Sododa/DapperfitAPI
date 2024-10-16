import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    Wishlist:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wishlist",
        },
    ],
    Admin: {
        type: Boolean,
        default: false,
    },
    ShippingAddress: {
        type: Boolean,
        default: false,
    },
    ShippingAddress: {
        FirstName: {
            type : String,
        },
        LastName: {
            type : String,
        },
        PostalCode: {
            type : String,
        },
        Province: {
            type : String,
        },
        Country: {
            type : String,
        },
        City: {
            type : String,
        },
        PhoneNumber: {
            type : String,
        },
    },    
},
{
    timestamps: true,
}
);

// compiling schema to model
const User = mongoose.model("User", UserSchema);
export default User;