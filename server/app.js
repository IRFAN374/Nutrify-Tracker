import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import dbConnect from './db/dbConnect.js';
import userRoutes from './routes/userRoutes.js';
import mealRoutes from './routes/mealRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
const app = express();
dotenv.config();

// middleware

app.use(express.json({limit:"30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended:true}))
app.use(cors());


app.get('/',(req,res)=>{
    res.send("welcome to user");
})

app.use('/user',userRoutes);
app.use('/meal',mealRoutes);
app.use('/admin',adminRoutes);

const PORT = process.env.PORT|| 5000;
const start = async ()=>{
    try {
        await dbConnect(process.env.DB_URL);
        app.listen(PORT,()=>{
            console.log(`Server is listening on Port: ${PORT}`);
        })
    } catch (error) {
        console.log("Error in Server starting: ",error);
    }
}

start();