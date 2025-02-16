require('dotenv').config();
require('./config/mongoose.config');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require("http");
const { Server } = require("socket.io");
const Message = require('./models/message.model'); // Ensure this model is correct

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const userRoutes = require('./routes/user.routes');
const prescriptionRoutes = require('./routes/prescription.routes');
const medicalHistoryRoutes = require('./routes/medicalHistory.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const chatRoutes = require('./routes/chat.routes');
const messageRoutes = require('./routes/message.routes');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
        console.log(`User ${socket.id} joined chat ${chatId}`);
    });

    socket.on('sendMessage', async (message) => {
        try {
            const newMessage = new Message({
                chatId: message.chatId,
                sender: message.sender,
                content: message.content
            });
            const savedMessage = await newMessage.save();

            // Emit the **saved** message, ensuring all properties exist
            io.to(message.chatId).emit('receiveMessage', savedMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

userRoutes(app);
prescriptionRoutes(app);
medicalHistoryRoutes(app);
appointmentRoutes(app);
chatRoutes(app);
messageRoutes(app);

app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send({ error: 'Something went wrong' });
});

server.listen(port, () => {
    console.log(`Listening at Port ${port}`);
});