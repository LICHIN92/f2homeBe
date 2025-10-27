import express from 'express'
import { login, Signin,address, myBooking, changeMobile, changePassword } from '../Controller/UserController.js'

const UserRoueter=express.Router()

UserRoueter.post('/',Signin)
UserRoueter.post('/login',login)
UserRoueter.post('/address/:id',address)
UserRoueter.get('/booking/:id',myBooking)
UserRoueter.patch('/changeMobile',changeMobile)
UserRoueter.post('/changePassword',changePassword)
export default UserRoueter  