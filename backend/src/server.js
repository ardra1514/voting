import express from 'express'
import 'dotenv/config'
import { connectDb } from './config/db.js'
import route from './routes/auth.route.js'
import voteRoutes from './routes/vote.route.js'

import cors from 'cors'

const app = express()
const PORT = process.env.PORT
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use('/api/auth',route)
app.use('/api',voteRoutes)
app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`);
    connectDb()
    
})





