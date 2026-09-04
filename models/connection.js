const mongoose = require("mongoose");

const connectionString = process.env.CONNECTION_STRING;

let cached = global.__astrodexMongoose;
if (!cached) {
  cached = global.__astrodexMongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(connectionString, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Database connected");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error("❌ Database error:", error);
    throw error;
  }
}

module.exports = { connectDb };
