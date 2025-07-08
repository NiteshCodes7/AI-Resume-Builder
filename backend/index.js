import { app } from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/index.js";

dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 5002;

connectDb()
.then(() => {
    app.listen(PORT, () => {
    PORT,
    console.log(`Server is running on port ${PORT}...`);
    })
})
.catch((err) => {
    console.log('Database connection failed:', err);
})

