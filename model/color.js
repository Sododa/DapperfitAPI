//color schema
import mongoose, { Mongoose } from "mongoose";

const Schema = mongoose.Schema;

const ColorSchema = new Schema({
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
    
},
      // day and time product was created
    {timestamps: true,}
);
// compile the model
const Color = mongoose.model("Color", ColorSchema);
export default Color;