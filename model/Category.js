//category schema
import mongoose, { Mongoose } from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    images: {
        type : String,
        default: "https://picsum.photos/200.300",
        required: true,
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
const Category = mongoose.model("Category", CategorySchema);
export default Category;