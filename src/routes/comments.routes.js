import {Router} from 'express'
import { authenticate } from '../middlewares/auth.middleware.js'
import * as controller from '../controllers/comments.controller.js'

const router = Router()

router.post('/post/:postId', authenticate, controller.createComment)
router.delete('/:commentId', authenticate, controller.deleteComment)
router.get('/:postId', controller.getComments)


export default router