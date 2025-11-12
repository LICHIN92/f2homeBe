import express from "express";
import { additem, addProduct, deleteUser, EditItem, EditProduct, findUser, searchItem, searchProduct, user} from "../Controller/adminController.js";
import upload from "../middleware/upload.js";

const adminRouter=express.Router()

adminRouter.post('/',upload.single('file'),additem)
adminRouter.post('/addProduct',upload.single('file'),addProduct)
adminRouter.post('/searchItem',searchItem)
adminRouter.put('/EditItem',EditItem)
adminRouter.post('/SearchProduct',searchProduct)
adminRouter.put('/editProduct',EditProduct)
adminRouter.get('/user',user)
adminRouter.get('/findUser',findUser )
adminRouter.delete('/deleteUser',deleteUser)

export default adminRouter  