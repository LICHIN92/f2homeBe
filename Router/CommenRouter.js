import express from 'express'
import { getItem, view, viewItem } from '../Controller/CommonController.js'

const CommenRoueter=express.Router()

CommenRoueter.get('/',getItem)
CommenRoueter.get('/view/:item',view)
CommenRoueter.get('/viewItem/:id',viewItem)

export default CommenRoueter 