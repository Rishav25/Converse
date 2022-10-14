import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import userRoutes from "./routes/userRoute.js";
import messagesRoute from "./routes/messagesRoute.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB Connected Successful`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
