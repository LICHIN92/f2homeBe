import express from 'express'
import { booking, cancel } from '../Controller/booking.js'
const bookRouter=express.Router()

bookRouter.post('/',booking)
bookRouter.delete('/:id',cancel)

export default bookRouter  