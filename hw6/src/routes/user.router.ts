import { Router, Request, Response } from 'express';
import { createValidator } from 'express-joi-validation';
import { UserInput, UserOutput } from '../models/user.model';
import { userSchema } from '../schemas/user.schema';

import { userService } from '../services';
import  jsonwebtoken  from 'jsonwebtoken';

const usersRouter = Router()
const validator = createValidator();
usersRouter.get('/', async (req: Request, res: Response, next) => {
  const filters = req.query;

  const results = await userService.getAll(filters).catch(err => { console.log(err) });

  return res.status(200).send(results);
})

usersRouter.get('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const user = await userService.get(id).catch(err => { console.log(err) })

  if (!user) {
    return res.status(404).send('User not found')
  }
  return res.status(200).send(user);
})

usersRouter.put('/:id', validator.body(userSchema), async (req: Request, res: Response) => {
  const payload: UserOutput = req.body;
  const id = String(req.params.id);

  const user = await userService.get(id);

  if (!user) {
    return res.status(404).send('User not found')
  }

  const result = await userService.update({ ...user, ...payload }).catch(err => { console.log(err) });
  return res.status(201).send(result);
})

usersRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const user = await userService.get(id);

  if (!user) {
    return res.status(404).send('User not found')
  }

  const result = await userService.softDelete(user);
  return res.status(204).send({
    success: result
  });
})

usersRouter.post('/', validator.body(userSchema), async (req: Request, res: Response) => {
  const payload: UserInput = req.body;

  const result = await userService.create(payload);
  return res.status(200).send(result);
})

usersRouter.post('/login', async (req: Request, res: Response) => {
  const { login, password } = req.body;
  if (!login || !password) {
    res.status(403).send({ success: false, message: 'Invalid login or password' });
  }
  const user = await userService.getUserByLogin(login);
  if (user && user.password === password) {
    const token = jsonwebtoken.sign(login, 'jdjdajkda');
    res.send(token);
  } else {
    res.status(403).send({ success: false, message: 'Invalid login or password' });
  }
})


export default usersRouter;