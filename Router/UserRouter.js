import express from 'express'
import { login, Signin,address } from '../Controller/UserController.js'

const UserRoueter=express.Router()

UserRoueter.post('/',Signin)
UserRoueter.post('/login',login)
UserRoueter.post('/address/:id',address)

export default UserRoueter 