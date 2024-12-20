import express from "express";
import dotenv from 'dotenv'
import connectDb from "./config/db.js";
import UserRouter from './routes/user.route.js'

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Form Builder");
});

app.use('/api/v1',UserRouter)

// server start
const startServer = async () => {
  await connectDb(); // Ensure DB is connected before starting the server

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
};

startServer();
