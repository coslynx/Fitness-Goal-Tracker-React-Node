import { MongoClient } from 'mongodb'; // import: mongodb 6.9.0
import { DatabaseConfig } from './config'; // import: src/core/infrastructure/database/config

export class Database {
  private client: MongoClient;

  constructor(config: DatabaseConfig) {
    this.client = new MongoClient(config.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB database');
    } catch (error) {
      console.error('Error connecting to MongoDB database:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.close();
      console.log('Disconnected from MongoDB database');
    } catch (error) {
      console.error('Error disconnecting from MongoDB database:', error);
      throw error;
    }
  }

  collection(collectionName: string): any {
    return this.client.db().collection(collectionName);
  }
}