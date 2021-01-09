import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

/**
 * Var initialized in each test
 */
let mongod: MongoMemoryServer;

/**
 * Function used to create a connection with mongo for testing
 * @param options
 */
export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = new MongoMemoryServer();
      const mongoUri = await mongod.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

/**
 * Function to close connection with mongo in each test
 */
export const closeMongodConnection = async () => {
  if (mongod) await mongod.stop();
};
