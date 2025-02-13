import mongoose from "mongoose";

export const connect = async (MONGO_URI) => {
    if(MONGO_URI){
        return await mongoose.connect(MONGO_URI)
    }
    return null;

}

export default connect;
/*
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30s
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Exit process if connection fails
    }
};

export default connect;
*/


/*
import mongoose from "mongoose";

const connect = async (MONGO_URL) => {
    try {
        await mongoose.connect(MONGO_URL, {
            serverSelectionTimeoutMS: 30000, // Wait 30s before failing
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Stop server if DB connection fails
    }
};

export default connect;
*/