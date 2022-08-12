require('dotenv').config()
require('express-async-errors');

const express = require('express');
const app = express()
const connectDb = require('./db/connect')
const authRoute = require('./routes/auth')
const publicationRoute = require('./routes/publication')
const notFound = require('./middleware/not-found')
const errorHandler = require("./middleware/error-handler");
const auth = require("./middleware/authentication");

//middlewares
app.use(express.json())
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/publications", [auth, publicationRoute])

app.use(notFound, errorHandler);










const port = process.env.PORT || 3000
const start = async() => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, ()=> console.log(`server listening on port: ${port}`))
    } catch (error) {
    
    }
}
start()