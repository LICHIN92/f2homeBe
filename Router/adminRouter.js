import express from "express";
import { additem, addProduct} from "../Controller/adminController.js";
import upload from "../middleware/upload.js";

const adminRouter=express.Router()

adminRouter.post('/',upload.single('file'),additem)
adminRouter.post('/addProduct',upload.single('file'),addProduct)

export default adminRouter  