import { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached;

if (process.env.NODE_ENV === "development") {
  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentially
   * during API Route usage.
   */
  cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null, dbName: null };
  }
}

async function connectToDatabase() {
  // Connection options for later
  let opts;
  // Follow different process for dev mode
  if (process.env.NODE_ENV === "development") {
    // if we have an existing cached connection...
    if (cached.conn) {
      return cached.conn;
    }

    // If we don't have a cached connection AND promise...
    if (!cached.promise) {
      opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
      };

      // Create connection promise
      cached.promise = connect(MONGODB_URI, opts).then((client) => {
        return client;
      });
    }

    // Resolve connection promise
    cached.conn = await cached.promise;
    return { connection: cached.conn, promise: cached.promise };
  }

  // In Test/Prod...
  opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
  };

  promise = connect(MONGODB_URI, opts).then((client) => {
    return client;
  });
  conn = await promise;
  return { connection: conn, promise: promise };
}

export { connectToDatabase };
