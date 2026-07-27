import express from 'express'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/posts.routes.js'
import likeRoutes from './routes/likes.routes.js'
import commentRoutes from './routes/comments.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express()

app.use(express.json())
// app.use(express.urlencoded())

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/user', userRoutes)


app.get('/', (req, res) => {
    res.send("Welcome to HomePage")
})

export default app