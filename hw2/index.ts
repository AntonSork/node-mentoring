import express, { Request, Response } from 'express';
import { createValidator, ValidatedRequest } from 'express-joi-validation';
import { User, Users } from './src/classes';
import { UserSchema, userSchema } from './src/schemas/user.schema';

const app = express();
const port = 3000;

app.use(express.json());

const db: Users = new Users();
const validator = createValidator();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/users', validator.body(userSchema), (req: ValidatedRequest<UserSchema>, res: Response) => {
  const user = new User(req.body);
  db.add(user);
  res.status(200).send(user);
});

app.put('/users', validator.body(userSchema), (req: ValidatedRequest<UserSchema>, res: Response) => {
  const user = req.body as User
  try {
    const updatedUser: User = db.updateUser(user);
    res.status(200).send(updatedUser);
  } catch (error) {
    _handelDbError(error, res, user.id);
  }
});

app.get('/users/:id', (req: Request, res: Response) => {
  const { id: userId } = req.params;
  try {
    const user: User = db.getUser(userId);
    res.status(200).send(user);
  } catch (error) {
    _handelDbError(error, res, userId);
  }
});

app.get('/users', (req: Request, res: Response) => {
  const {loginSubstring, limit} = req.query;

  const users: User[] = db.getUsers(loginSubstring as string, Number(limit));
  res.status(200).send(users);
});

app.delete('/users/:id', (req: Request, res: Response) => {
  const { id: userId } = req.params;
  try {
    const user: User = db.delete(userId);
    res.status(200).send(user);
  } catch (error) {
    _handelDbError(error, res, userId);
  }
})

function _handelDbError(err: unknown, res: Response, userId: string) {
  if (err instanceof Error && err.message === `User ${userId} not found`) res.status(404).send(err.message);
  res.status(500).send();
}