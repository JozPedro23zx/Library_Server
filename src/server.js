const express = require('express')
const router = require('./routes')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)

let port = 8000
app.listen(port, error =>{
    if(error){
        console.log(error)
    }else{
        console.log(`Api server running in port ${port}`)
    }
})