import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import context from '../context';
import config from '../config';
import schema from '../schema';
import logger from '../logger';
import auth from '../middlewares/auth';

const router = express.Router();

router.use('/', auth, graphqlHTTP(async (req: any, res) => {
  context.player = req.player;

  return {
    context,
    customFormatErrorFn: (error) => {
      logger.error({
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
      });
      return error;
    },
    graphiql: config.graphql.graphiql,
    schema,
  };
}));

export default router;
