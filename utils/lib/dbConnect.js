import mongoose from "mongoose";

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

async function dbConnect(name) {
  let opts;
  if (process.env.NODE_ENV === "development") {
    // If we have an open connection but a changed name...
    if (cached.conn && cached.dbName !== name) {
      // Close the mongo connection and reset cached
      mongoose.connection.close();
      cached = { conn: null, promise: null, dbName: null };
    }
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        //   bufferMaxEntries: 0,
        //   useFindAndModify: true,
        //   useCreateIndex: true,
        dbName: name,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    return { connection: cached.conn, promise: cached.promise };
  }
  opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    //   bufferMaxEntries: 0,
    //   useFindAndModify: true,
    //   useCreateIndex: true,
    dbName: name,
  };

  promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
    return mongoose;
  });
  conn = await promise;
  return { connection: conn, promise: promise };
}

export default dbConnect;
