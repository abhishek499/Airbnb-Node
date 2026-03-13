//This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';


type ServerConfig = {
    PORT: number
    API_VERSION: string
    REDIS_HOST: string
    REDIS_PORT: number
    MAIL_USER: string
    MAIL_PASS: string
}


export function loadenv(){
    dotenv.config()
    console.log('Environment variable loaded.')
    
}

loadenv();

export const serverConfig : ServerConfig = {
    PORT: Number(process.env.PORT) || 3000,
    API_VERSION: process.env.APP_VERSION || 'v1',
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
    MAIL_PASS: process.env.EMAIL_PASS || '',
    MAIL_USER: process.env.EMAIL_USER || '',
}