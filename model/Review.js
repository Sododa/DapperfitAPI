import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    // admin to create it
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user is the one to review"],
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "user is the one to review"],
    },
    message: {
        type: String,
        required: [true, "Kindly review our Product"],
    },
    rating: {
        type: Number,
        required: [true, "Product Rating"],
        min: 1,
        max: 5,
    },
},
      // day and time product was created
    {timestamps: true,}
);
// compile the model
const Review = mongoose.model("Review", ReviewSchema);
export default Review;