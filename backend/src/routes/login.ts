import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import config from '../config';
import PlayerRepository from '../repositories/MongoosePlayerRepository';

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;

  const playerRepository = new PlayerRepository();
  const players = await playerRepository.find({ first: 1, offset: 0, email: data.email });

  if (players.length === 0) {
    res.status(400);
    res.json({
      error: 'Wrong email or password!',
    });
    return;
  }

  const player = players[0];

  if (player.isVerified === false) {
    res.status(400);
    res.json({
      error: 'E-mail address is not verified! Please check your e-mail.',
    });
    return;
  }

  const isCorrect = await bcrypt.compareSync(data.password, player.password);

  if (!isCorrect) {
    res.status(400);
    res.json({
      error: 'Wrong email or password!',
    });
    return;
  }

  const refreshToken: string = uuidv4();

  await playerRepository.update({
    id: player.id,
    refreshTokens: [
      ...'refreshTokens' in player ? player.refreshTokens : [],
      { expiresAt: '', token: refreshToken },
    ],
  });

  res.cookie("refreshToken", refreshToken, {
    secure: config.env !== 'DEVELOPMENT',
    httpOnly: true,
    domain: config.domain,
  });
  res.json({
    error: null,
    data: {
      id: player.id,
      email: player.email,
      token: jwt.sign({ id: player.id, email: player.email }, config.jwt.secret, { algorithm: 'HS512', expiresIn: config.jwt.ttl }),
    },
  });
});

export default router;
