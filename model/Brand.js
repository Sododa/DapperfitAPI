//brand schema
import mongoose, { Mongoose } from "mongoose";

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    // admin to create it
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ]
},
      // day and time product was created
    {timestamps: true,}
);
// compile the model
const Brand = mongoose.model("Brand", BrandSchema);
export default Brand;