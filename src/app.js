import express from 'express'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/posts.routes.js'
import likeRoutes from './routes/likes.routes.js'
import commentRoutes from './routes/comments.routes.js'
import userRoutes from './routes/user.routes.js'
import boardRoutes from './routes/boards.routes.js'
import followRoutes from './routes/follows.routes.js'
import cookieParser  from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/user', userRoutes)
app.use('/api/boards', boardRoutes)
app.use('/api/follows', followRoutes)


app.get('/', (req, res) => {
    res.send("Welcome to HomePage")
})

export default app