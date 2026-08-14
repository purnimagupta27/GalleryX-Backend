import {Router} from 'express'
import { authenticate } from '../middlewares/auth.middleware.js'
import * as controller from '../controllers/likes.controller.js'

const router = Router()

router.post('/post/:postId', authenticate, controller.createLike)
router.delete('/post/:postId', authenticate, controller.removeLike)


export default router