import express from 'express'
import  'dotenv/config';
import Db from './config/db.js';
import CommenRoueter from './Router/CommenRouter.js';
import UserRoueter from './Router/UserRouter.js'
import cors from 'cors'
import adminRouter from './Router/adminRouter.js';
import bookRouter from './Router/bookRouter.js';
const port=process.env.port
Db()
const app = express()
app.use(express.json())

const corsOptions = {
    origin: ['http://localhost:5173','https://f2home.vercel.app'], // Corrected to an array
    methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};  

app.use(cors(corsOptions)); 

app.options('/', cors(corsOptions));   
app.use('/',CommenRoueter)
app.use('/user',UserRoueter)
app.use('/admin',adminRouter) 
app.use('/booking',bookRouter)
app.listen(port,() => {  
    console.log(`server running at port ${port}`);

})  