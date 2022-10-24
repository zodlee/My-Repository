import express from "express"
import { create_Item, get_paginated_items } from "../controllers/Item_Controller.js"
import {userProtect} from "../middlewares/auth_handler.js"

const item_router = express.Router()

item_router.route("/")
    .post(userProtect, create_Item)
    .get(userProtect, getItem)

item_router.get("/get_paginated_items", userProtect, get_paginated_items)

export default item_router    