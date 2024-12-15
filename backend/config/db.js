import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    if (!conn) console.log(conn);

    console.log(`MongoDb connected successfully`);
  } catch (error) {
    console.error("Error Connecting DB" + error.message);
    process.exit(1);
  }
};

export default connectDb;
