import { Router } from 'express'
import { CustomLogger } from '../middlewares/log.middleware'
import groupRouter from './group.router'
import usersRouter from './user.router'
import userToGroupRouter from './user_group.router'

const router = Router()
const userLogger = new CustomLogger('userService');
router.use('/users', userLogger.log(), usersRouter)
router.use('/groups', groupRouter)
router.use('/user_to_groups', userToGroupRouter)

export default router