import express from "express";
import { additem, addProduct, deleteProduct, deleteUser, EditItem, EditProduct, findUser, searchItem, searchProduct, user} from "../Controller/adminController.js";
import upload from "../middleware/upload.js";
import { adminAuth } from "../middleware/adminAuth.js";

const adminRouter=express.Router()

adminRouter.post('/',adminAuth,upload.single('file'),additem)
adminRouter.post('/addProduct',adminAuth,upload.single('file'),addProduct)
adminRouter.post('/searchItem',adminAuth,searchItem)
adminRouter.put('/EditItem',adminAuth,EditItem)
adminRouter.post('/SearchProduct',adminAuth,searchProduct)
adminRouter.put('/editProduct',adminAuth,EditProduct)
adminRouter.get('/user',adminAuth,user)
adminRouter.get('/findUser',adminAuth,findUser )
adminRouter.delete('/deleteUser',adminAuth,deleteUser)
adminRouter.delete('/deleteProduct/:id',adminAuth,deleteProduct)
export default adminRouter   