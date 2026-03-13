import Redis from 'ioredis';
import Redlock from "redlock";
import { serverConfig } from '.';

// export const redisClient = new Redis(serverConfig.REDIS_SERVER_URL);

function connectToRedis() {
    try {
        let connection: Redis;


        return (): Redis => {
            if (!connection) {
                connection = new Redis(serverConfig.REDIS_SERVER_URL);
                console.log('Connected to Redis successfully.');
            }

            return connection;
        }
    } catch (error) {
        console.error("Error connecting to Redis:", error);
        throw error;
    }
}

export const getRedisConnObject = connectToRedis();

// attach basic event handlers
getRedisConnObject().on('connect', () => {
  console.info('Redis client connected');
});
getRedisConnObject().on('error', (err) => {
  console.error('Redis client error', err);
});

export const redlock = new Redlock([getRedisConnObject() as any], {
  driftFactor: 0.01, // time in ms
  retryCount: 10,
  retryDelay: 200, // time in ms
  retryJitter: 200 // time in ms
});

// Redlock client error handler
redlock.on('clientError', (err) => {
  console.error('A redis error has occurred in redlock:', err);
});