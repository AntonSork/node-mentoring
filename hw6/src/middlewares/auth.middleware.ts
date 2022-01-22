import jsonwebtoken from 'jsonwebtoken'
import path from 'node:path/win32';

export function checkToken(req, res, next) {
  const paths = req.originalUrl.split('/');
  if (paths[paths.length - 1] === 'login') {
    next()
    return
  }

  const token = req.headers['x-access-token'];
  if (token) {
    jsonwebtoken.verify(token, 'jdjdajkda', (err) => {
      if (err) {
        res.status(403).send({ message: err.message });
      } else {
        next();
      }
    })
  } else {
    res.status(401);
  }
}