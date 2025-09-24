import mongoose from "mongoose";

const connetDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connection Successful");
    } catch (error) {
        console.log("Connection Error"+error);
    }
}
export default connetDb;