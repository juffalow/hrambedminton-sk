import jwt from 'jsonwebtoken';
import config from '../config';

export default function auth(req, res, next): void {
  if (req.method === 'OPTIONS') {
    next();
  }

  if ('authorization' in req.headers) {
    const token = req.headers.authorization.replace('Bearer ', '');

    try {
      const player = jwt.verify(token, config.jwt.secret);
      req.player = player;
    } catch (error) {
      res.status(401);
      return res.json({ error: 'Unauthorized!' });
    }
  } else {
    req.player = {
      id: null,
      role: 'PUBLIC',
    }
  }

  next();
}
