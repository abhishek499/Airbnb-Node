//This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';


type ServerConfig = {
    PORT: number
    API_VERSION: string
    MONGODB_URI: string
    REDIS_SERVER_URL: string
    REDLOCK_TTL: number
}


export function loadenv(){
    dotenv.config()
    console.log('Environment variable loaded.')
    
}

loadenv();

export const serverConfig : ServerConfig = {
    PORT: Number(process.env.PORT) || 3000,
    API_VERSION: process.env.APP_VERSION || 'v1',
    MONGODB_URI: process.env.MONGODB_URI || '',
    REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || 'redis://localhost:6379',
    REDLOCK_TTL: Number(process.env.REDLOCK_TTL) || 10000
}