import logger from '../logger';

export default function logResponseTime(req, res, next): void {
  const startHrTime = process.hrtime();

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    logger.info(`Response time for ${req.baseUrl}${req.path}: ${elapsedTimeInMs}ms`, { responseTime: elapsedTimeInMs });
  });

  next();
}
