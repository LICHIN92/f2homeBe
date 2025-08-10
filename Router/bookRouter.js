import express from 'express'
import { booking } from '../Controller/booking.js'
const bookRouter=express.Router()

bookRouter.post('/',booking)

export default bookRouter