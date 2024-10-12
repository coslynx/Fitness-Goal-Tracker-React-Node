import { MongoClient, ServerApiVersion } from 'mongodb';
import { API_BASE_URL, DATABASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, JWT_SECRET } from './config';

export interface DatabaseConfig {
  url: string;
}

export interface LoggerConfig {
  logLevel: number;
}

export interface EncryptionConfig {
  algorithm: string;
  secretKey: string;
}

export const databaseConfig: DatabaseConfig = {
  url: DATABASE_URL,
};

export const loggerConfig: LoggerConfig = {
  logLevel: 3, // Example log level
};

export const encryptionConfig: EncryptionConfig = {
  algorithm: 'aes-256-cbc',
  secretKey: 'your_secret_key', // Replace with a strong secret key
};

export const googleAuthConfig = {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
};

export const facebookAuthConfig = {
  clientId: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
};

export const jwtSecret = JWT_SECRET;