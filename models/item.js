import mongoose from "mongoose"

const itemSchema = mongoose.Schema(
    {
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        itemName: {yype: String},
        price: {type: Number},
        size: {type: String},
        typeOfItem: {type: String},
        qty: {type: Number},
        availability: {
            type: Boolean,
            default: true
        },
        description: {type: String}
    },
    {
        timestamps: true
    }
)
const Item = mongoose.model("Item", itemSchema)
export default Item 