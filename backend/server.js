const express = require("express")
const cors = require('cors')
const colors = require("colors")
const doenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())

app.use(express.json.apply())

app.use(express.urlencoded({extended: false}))

app.use("/api/inventory", require("./routes/inventoryManagerRoutes"))
app.use("/api/users", require("./routes/userRoutes"))



app.use(errorHandler)

app.listen(port, console.log("server running"))
