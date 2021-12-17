import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import PlayerRepository from '../repositories/MongoosePlayerRepository';

const router = express.Router();

router.get('/:playerId', async (req, res) => {

  const playerRepository = new PlayerRepository();
  const player = await playerRepository.get(req.params.playerId);

  if('refreshTokens' in player === false || 'refreshToken' in req.cookies === false || !player.refreshTokens.includes(req.cookies('refreshToken'))) {
    res.status(401);
    res.json({
      error: {
        code: 1,
        message: 'Invalid refresh token!',
      },
      data: null,
    });
    return;
  }

  res.json({
    error: null,
    data: {
      id: player.id,
      token: jwt.sign({ id: player.id, email: player.email }, config.jwt.secret, { algorithm: 'HS512', expiresIn: config.jwt.ttl }),
    },
  });
});

export default router;
