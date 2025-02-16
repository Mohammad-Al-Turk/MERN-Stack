const express = require('express');
const chatController = require('../controllers/chat.controller');
const { authenticate } = require('../config/jwt.config'); // Import authenticate middleware


module.exports = app => {
    app.post('/api/chats/create', authenticate, chatController.createChat);
    app.get('/api/chats/all', authenticate, chatController.getAllChats);
    app.get('/api/chats/user/:id', authenticate, chatController.getAllChatsForUser);
}
