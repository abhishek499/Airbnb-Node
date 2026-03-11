import Redis from 'ioredis';
import Client from "ioredis";
import Redlock from "redlock";
import { serverConfig } from '.';

export const redisClient = new Redis(serverConfig.REDIS_SERVER_URL);

// attach basic event handlers
redisClient.on('connect', () => {
  console.info('Redis client connected');
});
redisClient.on('error', (err) => {
  console.error('Redis client error', err);
});

export const redlock = new Redlock([redisClient as any], {
  driftFactor: 0.01, // time in ms
  retryCount: 10,
  retryDelay: 200, // time in ms
  retryJitter: 200 // time in ms
});

// Redlock client error handler
redlock.on('clientError', (err) => {
  console.error('A redis error has occurred in redlock:', err);
});