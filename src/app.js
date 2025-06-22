import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const DBconnector = mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Database connected");
})
.catch((error) => {
  console.log("Failed to Connect to database", error);
});

export default DBconnector;
