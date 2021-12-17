import config from '../config';

export default function cors(req, res, next): void {
  res.header('Access-Control-Allow-Credentials', 'true');
  if (config.env === 'PRODUCTION') {
    res.header('Access-Control-Allow-Origin', '*.hrambedminton.sk');
  } else {
    res.header('Access-Control-Allow-Origin', req.get('origin'));
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Max-Age', '600');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
}