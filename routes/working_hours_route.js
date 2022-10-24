import express from "express";
import { userProtect } from "../middlewares/auth_handler.js";
import { create_workday } from "../controllers/workingHoursController.js";

const work_router = express.Router()

work_router.route("/working-hours")
    .post(userProtect, create_workday)

export default work_router