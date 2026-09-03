const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json());
app.use(express.static("public"))

const geminiRoutes = require("./routes/geminiRoutes")
app.use('/api', geminiRoutes)


app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running")
})