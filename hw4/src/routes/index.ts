import { Router } from 'express'
import groupRouter from './group.router'
import usersRouter from './user.router'
import userToGroupRouter from './user_group.router'

const router = Router()

router.use('/users', usersRouter)
router.use('/groups', groupRouter)
router.use('/user_to_groups', userToGroupRouter)

export default router