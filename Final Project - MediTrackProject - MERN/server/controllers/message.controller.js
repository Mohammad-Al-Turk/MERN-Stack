const Message = require('../models/message.model');

// Send a message in a chat
const sendMessage = async (user, chat, content) => {
    return await Message.create({
        sender: user._id,
        chat: chat._id,
        content: content
    });
};

// Get all messages in a chat
const getAllMessages = async (chatId) => {
    return await Message.find({ chat: chatId }).populate('sender', 'name').populate('chat');
};

// Get a message by ID
const getMessageById = async (messageId) => {
    return await Message.findById(messageId).populate('sender', 'name').populate('chat');
};

module.exports = {
    sendMessage,
    getAllMessages,
    getMessageById
};
