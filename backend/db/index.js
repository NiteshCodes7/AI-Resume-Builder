import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\nMongoDB Connected! DB_Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection failed", error);
        process.exit(1);
    }
}

export default connectDb;