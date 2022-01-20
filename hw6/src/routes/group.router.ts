import { Router, Request, Response } from 'express';
import { GroupInput, GroupOutput } from '../models/group.model';

import { groupService } from '../services/index';

const groupRouter = Router()

groupRouter.get('/', async (req: Request, res: Response) => {
  const filters = req.query;

  const results = await groupService.getAll(filters).catch(err => { console.log(err) });

  return res.status(200).send(results);
})

groupRouter.get('/:id', async (req: Request, res: Response) => {

  const id = String(req.params.id);

  const user = await groupService.get(id).catch(err => { console.log(err) })

  if (!user) {
    return res.status(404).send('User not found')
  }
  return res.status(200).send(user);
})

groupRouter.put('/:id', async (req: Request, res: Response) => {
  const payload: GroupOutput = req.body;
  const id = String(req.params.id);

  const user = await groupService.get(id);

  if (!user) {
    return res.status(404).send('User not found')
  }

  const result = await groupService.update({ ...user, ...payload }).catch(err => { console.log(err) });
  return res.status(201).send(result);
})

groupRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);
  try {
    const group = await groupService.get(id);

    if (!group) {
      return res.status(404).send('Group not found')
    }

    const result = await groupService.hardDelete(group);
    return res.status(204).send({
      success: result
    });
  } catch (err) {
    console.log(err);

  }

  
})

groupRouter.post('/', async (req: Request, res: Response) => {
  const payload: GroupInput = req.body;

  const result = await groupService.create(payload);
  return res.status(200).send(result);
})

export default groupRouter;