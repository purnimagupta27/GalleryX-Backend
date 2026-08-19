import { Router } from 'express'
import * as controller from '../controllers/auth.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/signup', controller.userSignup)
router.post('/signin', controller.userSignin)
router.get('/me', authenticate, controller.getMe)
router.post('/logout', authenticate, controller.userLogout)

export default router