export default {
  port: 3010,
  env: process.env.NODE_ENV || 'DEVELOPMENT',
  graphql: {
    graphiql: (process.env.GRAPHQL_GRAPHIQL && process.env.GRAPHQL_GRAPHIQL === 'true') || false,
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    ttl: parseInt(process.env.JWT_TTL) || 15 * 60,
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
  services: {
    aws: {
      accessKeyId: process.env.SERVICES_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.SERVICES_AWS_SECRET_ACCESS_KEY,
      region: process.env.SERVICES_AWS_REGION,
    },
  },
}
