import { Router, Request, Response } from 'express';
import { userGroupService } from '../services/index';

const userToGroupRouter = Router()


userToGroupRouter.post('/', async (req: Request, res: Response) => {
  const payload: { groupId: string, userIds: string[] } = req.body;
  const { groupId, userIds } = payload
  const result = await userGroupService.addUsersToGroup(groupId, userIds);
  return res.status(200).send(result);
})

export default userToGroupRouter;