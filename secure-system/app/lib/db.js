import mongoose from 'mongoose';

const dbHost = '127.0.0.1';
const dbPort = 27017;
const dbName = 'User'; 
const dbURI = `mongodb://${dbHost}:${dbPort}/${dbName}`;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(dbURI, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log(`Connected to MongoDB: ${dbURI}`);
      return mongoose;
    }).catch((error) => {
      console.error("MongoDB connection error:", error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}



// let dbConnection = null;

// export async function connectDB() {
//   // If already connected, return existing connection
//   if (dbConnection && dbConnection.readyState === 1) {
//     return dbConnection;
//   }

//   try {
//     dbConnection = mongoose.createConnection(dbURI);
    
//     // Event listeners
//     dbConnection.on('connected', () => {
//       console.log(`Connected to ${dbURI}`);
//     });
    
//     dbConnection.on('disconnected', () => {
//       console.log('Connection lost with database');
//     });
    
//     dbConnection.on('error', (err) => {
//       console.log('Database error:', err);
//     });

//     return dbConnection;
//   } catch (error) {
//     console.error('Database connection error:', error);
//     throw error;
//   }
// }

// export function getConnection() {
//   return dbConnection;
// }

// // Graceful shutdown
// const shutdown = async (msg) => {
//   if (dbConnection) {
//     await dbConnection.close();
//     console.log(`Mongoose shutdown: ${msg}`);
//   }
//   process.exit(0);
// };

// process.on('SIGINT', () => shutdown('application ends'));
// process.on('SIGTERM', () => shutdown('SIGTERM received'));