const express = require('express');
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoutes = require("./routes/UserRoutes.js")
app.use('/api/user', userRoutes)
const cardRoutes = require("./routes/CardRoutes.js")
app.use('/api/card', cardRoutes)
const priorityRoutes = require("./routes/PriorityRoutes.js")
app.use('/api/priority', priorityRoutes)
const categoryRoutes = require("./routes/CategoryRoutes.js")
app.use('/api/category', categoryRoutes)
const boardRoutes = require("./routes/BoardRoutes.js")
app.use('/api/board', boardRoutes)
const listRoutes = require("./routes/ListRoutes.js")
app.use('/api/list', listRoutes)
const imageRoutes = require("./routes/ImageRoutes.js")
app.use('/api/image', imageRoutes)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server port: ${process.env.SERVER_PORT}`)
})