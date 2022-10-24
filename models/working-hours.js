//import { string } from "joi";
import mongoose from "mongoose";

const workingSchema = mongoose.Schema(
    {
        created_by:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        workDays: [
            {
                day: {type: String},
                openingHour: {type: String || Date},
                closingHour: {type: String || Date}
            }
        ]
    },
    {
        timeeStamps: true
    }
)

const workDays = mongoose.model("Working-Hours", workingSchema)
export default workDays