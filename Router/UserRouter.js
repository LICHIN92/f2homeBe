import express from 'express'
import { login, Signin,address, myBooking, changeMobile } from '../Controller/UserController.js'

const UserRoueter=express.Router()

UserRoueter.post('/',Signin)
UserRoueter.post('/login',login)
UserRoueter.post('/address/:id',address)
UserRoueter.get('/booking/:id',myBooking)
UserRoueter.patch('/changeMobile',changeMobile)
export default UserRoueter 