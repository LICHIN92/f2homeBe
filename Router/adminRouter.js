import express from "express";
import { additem, addProduct, EditItem, searchItem} from "../Controller/adminController.js";
import upload from "../middleware/upload.js";

const adminRouter=express.Router()

adminRouter.post('/',upload.single('file'),additem)
adminRouter.post('/addProduct',upload.single('file'),addProduct)
adminRouter.post('/searchItem',searchItem)
adminRouter.put('/EditItem',EditItem)
export default adminRouter  