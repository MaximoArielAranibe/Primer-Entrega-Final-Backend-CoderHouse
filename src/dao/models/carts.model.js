import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const cartModel = mongoose.model("carts", cartSchema);
export default cartModel;