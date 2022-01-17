import { Router } from 'express'
import groupRouter from './group.router'
import usersRouter from './user.router'

const router = Router()

router.use('/users', usersRouter)
router.use('/groups', groupRouter)

export default router