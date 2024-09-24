import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
//import { errorHandler } from './middleware/errorHandler.js';

dotenv.config()

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(express.json())


// Routesnow
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

// Error Handling Middleware
//app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
