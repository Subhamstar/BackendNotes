 
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongoDB")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

// to make input as json
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: "https://subhamnotesfrontend-417t.onrender.com",methods: ['GET', 'POST'], credentials:true })) 
// app.use(cors({ origin:"*"}))
const port=process.env.PORT || 4000;
app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

// import routes
import authRouter from "./routes/auth.route.js"
import noteRouter from "./routes/note.route.js"

app.use("/api/auth", authRouter)
app.use("/api/note", noteRouter)

// error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Serer Error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
