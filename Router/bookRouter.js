import express from 'express'
import { booking, cancel, itemorder, orders } from '../Controller/booking.js'
const bookRouter=express.Router()

bookRouter.post('/',booking)
bookRouter.delete('/:id',cancel)
bookRouter.get('/orders',orders)
bookRouter.get('/itemBooked/:item',itemorder)
export default bookRouter  