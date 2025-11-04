import express from 'express'
import { getItem, search, viewProfile, view, viewItem} from '../Controller/CommonController.js'

const CommenRoueter=express.Router()

CommenRoueter.get('/',getItem)
CommenRoueter.get('/view/:item',view)
CommenRoueter.get('/viewItem/:id',viewItem)
CommenRoueter.post('/search',search)
CommenRoueter.get('/viewProfile/:id',viewProfile)
export default CommenRoueter   