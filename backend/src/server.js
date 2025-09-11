import express from "express";

// dtenv is imported to read env files
import "dotenv/config";
import cookieParser from "cookie-parser"; //Read cookies sent by the client.
import cors from "cors"; //Allow your frontend (different origin) to make requests to your backend.
// for deployment
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
  })
);

//Without express.json(), your server cannot read JSON data sent by the client.
app.use(express.json());
app.use(cookieParser());

// if we are gonna visit /api/auth/signup we will hit authRoutes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
// app.get('/',(req,res)=>{
//   res.send("Hello")
// })

if (process.env.NODE_ENV === "production") {
  // if in production take the dist folder from frontend and convert it to static
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // so this says any route other than above defined route will return our
  // react application
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // here we are calling the connectDB() method in db.js so as to make
  // database connection
  connectDB();
});