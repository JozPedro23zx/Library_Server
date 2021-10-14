const dotenv = require('dotenv')
const express = require('express')
const router = require('./routes')

dotenv.config()

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)

app.listen(process.env.PORT, error =>{
    if(error){
        console.log(error)
    }else{
        console.log(`Api server running in port ${process.env.PORT}`)
    }
})