import  dotenv  from 'dotenv';
import express from 'express'
import mongoose from 'mongoose';
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
const app = express();

dotenv.config()
app.use(express.json())

mongoose.connect(
    process.env.MONGO
    
).then(  ()=>{
    console.log('Mongo DB  is connected ')    }
    
).catch(err =>{
    console.log(err)
})


app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})

app.use('/api/user', userRoutes )
app.use('/api/auth', authRoutes)


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message ||  'Internal server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});