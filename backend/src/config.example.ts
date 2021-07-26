export default {
  port: 3010,
  graphql: {
    graphiql: (process.env.GRAPHQL_GRAPHIQL && process.env.GRAPHQL_GRAPHIQL === 'true') || false,
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },
  database: {
    connection: {
      url : process.env.DATABASE_CONNECTION_URL || '',
    },
  },
  mail: {
    sendgrid: {
      apiKey: process.env.MAIL_SENDGRID_APIKEY || '',
    },
  },
}
