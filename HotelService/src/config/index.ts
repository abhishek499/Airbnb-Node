//This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';


type ServerConfig = {
    PORT: number
    API_VERSION: string
    MONGODB_URI: string
}

type DBConfig = {
    DB_HOST: string,
    DB_USER: string,
    DB_PASSWORD: string,
    DB_NAME: string
}


export function loadenv(){
    dotenv.config()
    console.log('Environment variable loaded.')
    
}

loadenv();

export const serverConfig : ServerConfig = {
    PORT: Number(process.env.PORT) || 3000,
    API_VERSION: process.env.APP_VERSION || 'v1',
    MONGODB_URI: process.env.MONGODB_URI || ''
}

export const dbConfig: DBConfig = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',
    DB_NAME: process.env.DB_NAME || 'test'
}