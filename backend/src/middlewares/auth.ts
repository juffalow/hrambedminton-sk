import jwt from 'jsonwebtoken';
import config from '../config';

export default function auth(req, res, next): void {
  if (req.method === 'OPTIONS') {
    next();
  }

  const token = 'authorization' in req.headers ? req.headers.authorization.replace('Bearer ', '') : null;

  try {
    const account = jwt.verify(token, config.jwt.secret);
    req.account = account;
  } catch (err) {
    // res.status(401);
    // return res.json({ error: 'Unauthorized!' });
  }

  next();
}
