import {Router} from 'express'
import * as controller from '../controllers/boards.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/create-board', authenticate, controller.createBoard)
router.patch('/update-board/:boardId', authenticate, controller.updateBoardName)
router.patch('/:boardId/add-post/:postId', authenticate, controller.addPostToBoard)
router.patch('/:boardId/remove-post/:postId', authenticate, controller.removePostFromBoard)

export default router