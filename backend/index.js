import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import { createAdminAccount } from './scripts/admin.js';


const app=express();
dotenv.config();

app.use(cors())
app.use(express.json())


mongoose.connect(process.env.Mongo_URI)
.then(()=>{
    console.log('Database is connected')
    createAdminAccount();
})
.catch((err)=>{console.log(err)})



app.get('/',(req,res)=>{
    res.send("Hello from home page")
})

app.use('/user',userRoutes)
app.use('/login',userRoutes)



app.listen(process.env.PORT,()=>{
    console.log("App is running")
})