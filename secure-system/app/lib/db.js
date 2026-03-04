import mongoose from 'mongoose';

const dbHost = '127.0.0.1';
const dbPort = 27017;
const dbName = 'User'; //to replace with your database name
const dbURI = `mongodb://${dbHost}:${dbPort}/${dbName}`;

let dbConnection = null;

export async function connectDB() {
  // If already connected, return existing connection
  if (dbConnection && dbConnection.readyState === 1) {
    return dbConnection;
  }

  try {
    dbConnection = mongoose.createConnection(dbURI);
    
    // Event listeners
    dbConnection.on('connected', () => {
      console.log(`Connected to ${dbURI}`);
    });
    
    dbConnection.on('disconnected', () => {
      console.log('Connection lost with database');
    });
    
    dbConnection.on('error', (err) => {
      console.log('Database error:', err);
    });

    return dbConnection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export function getConnection() {
  return dbConnection;
}

// Graceful shutdown
const shutdown = async (msg) => {
  if (dbConnection) {
    await dbConnection.close();
    console.log(`Mongoose shutdown: ${msg}`);
  }
  process.exit(0);
};

process.on('SIGINT', () => shutdown('application ends'));
process.on('SIGTERM', () => shutdown('SIGTERM received'));