import { PrismaClient } from '@prisma/client';
import logger from '../logger.js';

const prisma = new PrismaClient();

async function databaseConnection() {
  try {
    await prisma.$connect();
    logger.info('Connected to the database');
  } catch (error) {
    logger.error('Error while connecting to database:', error);
    throw error;
  }
}


process.on('SIGINT', async () => {
  try {
    await prisma.$disconnect();
    logger.info('Disconnected from the database');
    process.exit(0);
  } catch (error) {
    logger.error('Error while disconnecting from the database:', error);
    process.exit(1);
  }
});

export default databaseConnection;
