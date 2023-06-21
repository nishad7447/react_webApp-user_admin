const express = require('express')
const cors= require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const userRoute=require('./routes/userRoute')
const adminRoute=require('./routes/adminRoute')

const app = express()
const PORT = process.env.PORT | 3001

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/webAppUserAdmin')
.then(()=>{console.log('DB connected');})
.catch((err)=>{console.log(err,'DB error');})

app.use('/', userRoute);
app.use('/admin', adminRoute);

app.get('/',(req,res)=>{
    res.send('Hello ')
})

app.listen(PORT, ()=> console.log('Server running on',PORT))