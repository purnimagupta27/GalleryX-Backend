import { Router } from "express"
import { authenticate } from "../middlewares/auth.middleware.js"
import * as controller from '../controllers/user.controller.js'

const router = Router()

router.get('/:userId', authenticate, controller.getUserProfile)

export default router