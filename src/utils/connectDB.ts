import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Database is connected to", db.connection.name);
  } catch (err: any) {
    console.error(err.message);
  }
};

export default connectDB;
