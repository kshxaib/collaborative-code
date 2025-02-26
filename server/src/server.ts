import express, { Response, Request } from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { SocketEvent, SocketId } from "./types/socket";
import { USER_CONNECTION_STATUS, User } from "./types/user";
import { Server } from "socket.io";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
    maxHttpBufferSize: 1e8,
    pingTimeout: 60000,
});

let userSocketMap: User[] = [];

// Function to get all users in a room
function getUsersInRoom(roomId: string): User[] {
    return userSocketMap.filter((user) => user.roomId == roomId);
}

// Function to get room id by socket id
function getRoomId(socketId: SocketId): string | null {
    const roomId = userSocketMap.find((user) => user.socketId === socketId)?.roomId;
    if (!roomId) {
        console.error("Room ID is undefined for socket ID:", socketId);
        return null;
    }
    return roomId;
}

// Function to get user by socket id
function getUserBySocketId(socketId: SocketId): User | null {
    const user = userSocketMap.find((user) => user.socketId === socketId);
    if (!user) {
        console.error("User not found for socket ID:", socketId);
        return null;
    }
    return user;
}

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Handle user joining a room
    socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, username }) => {
        const isUsernameExist = getUsersInRoom(roomId).some((u) => u.username === username);
        if (isUsernameExist) {
            io.to(socket.id).emit(SocketEvent.USERNAME_EXISTS);
            return;
        }

        const user: User = {
            username,
            roomId,
            status: USER_CONNECTION_STATUS.ONLINE,
            cursorPosition: 0,
            typing: false,
            socketId: socket.id,
            currentFile: null,
        };
        userSocketMap.push(user);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user });

        const users = getUsersInRoom(roomId);
        io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users });
    });

    // Handle WebRTC signaling
    socket.on("offer", ({ offer, roomId }) => {
        socket.broadcast.to(roomId).emit("offer", { offer, sender: socket.id });
    });

    socket.on("answer", ({ answer, roomId }) => {
        socket.broadcast.to(roomId).emit("answer", { answer, sender: socket.id });
    });

    socket.on("ice-candidate", ({ candidate, roomId }) => {
        socket.broadcast.to(roomId).emit("ice-candidate", { candidate, sender: socket.id });
    });

    // Handle user disconnecting
    socket.on("disconnecting", () => {
        const user = getUserBySocketId(socket.id);
        if (!user) return;

        const roomId = user.roomId;
        socket.broadcast.to(roomId).emit(SocketEvent.USER_DISCONNECTED, { user });
        userSocketMap = userSocketMap.filter((u) => u.socketId !== socket.id);
        socket.leave(roomId);
    });

    // Handle file actions
    socket.on(SocketEvent.FILE_CREATED, ({ parentDirId, newFile }) => {
        const roomId = getRoomId(socket.id);
        if (!roomId) return;
        socket.broadcast.to(roomId).emit(SocketEvent.FILE_CREATED, { parentDirId, newFile });
    });

    socket.on(SocketEvent.FILE_UPDATED, ({ fileId, newContent }) => {
        const roomId = getRoomId(socket.id);
        if (!roomId) return;
        socket.broadcast.to(roomId).emit(SocketEvent.FILE_UPDATED, { fileId, newContent });
    });

    // Handle chat messages
    socket.on(SocketEvent.SEND_MESSAGE, ({ message }) => {
        const roomId = getRoomId(socket.id);
        if (!roomId) return;
        socket.broadcast.to(roomId).emit(SocketEvent.RECEIVE_MESSAGE, { message });
    });

    // Handle user typing
    socket.on(SocketEvent.TYPING_START, ({ cursorPosition }) => {
        userSocketMap = userSocketMap.map((user) =>
            user.socketId === socket.id ? { ...user, typing: true, cursorPosition } : user
        );

        const user = getUserBySocketId(socket.id);
        if (!user) return;
        const roomId = user.roomId;
        socket.broadcast.to(roomId).emit(SocketEvent.TYPING_START, { user });
    });

    socket.on(SocketEvent.TYPING_PAUSE, () => {
        userSocketMap = userSocketMap.map((user) =>
            user.socketId === socket.id ? { ...user, typing: false } : user
        );

        const user = getUserBySocketId(socket.id);
        if (!user) return;
        const roomId = user.roomId;
        socket.broadcast.to(roomId).emit(SocketEvent.TYPING_PAUSE, { user });
    });
});

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
