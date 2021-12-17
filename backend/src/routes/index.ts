import express from 'express';
import graphql from './graphql';
import login from './login';
import refreshToken from './refreshToken';
import test from './test';

const router = express.Router();

router.use('/graphql', graphql);
router.use('/login', login);
router.use('/refresh-token', refreshToken);
router.use('/test', test);

export default router;
