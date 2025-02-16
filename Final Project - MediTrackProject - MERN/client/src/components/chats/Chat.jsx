import { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Input, Button, Form, Select, Avatar, List } from 'antd'; // Import Avatar and List
import axios from 'axios';
import "antd/dist/reset.css";
import '../../styles/Chat.css';
import { io } from 'socket.io-client';
const { Sider, Content } = Layout;
import { useOutletContext } from 'react-router-dom';
import { usePatients } from '../listData/PatientsList';

const socket = io('http://localhost:8000');

const Chat = (props) => {
    const context = useOutletContext() || {};
    const user = props.user || context.user || null; // Ensure user is not null

    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const [newChatUser, setNewChatUser] = useState('');
    const { patients, loading: patientsLoading } = usePatients();
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (selectedChat) {
            setMessages(selectedChat.messages || []); // Set initial messages
        }
    }, [selectedChat]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/user/${userId}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error fetching user details:", error);
            return { user: { firstName: "Unknown", lastName: "User" } }; // Provide default data
        }
    };

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8000/api/chats/user/${user._id}`, { withCredentials: true })
                .then(async response => {
                    const fetchedChats = await Promise.all(response.data.map(async chat => {
                        const otherParticipants = chat.participants.filter(participant => participant !== user._id);
    
                        if (otherParticipants.length === 0) {
                            return {
                                id: chat._id,
                                name: "Group Chat or No Other Participants",
                                messages: chat.messages
                            };
                        }
    
                        // Check if otherParticipants[0] exists before fetching details
                        if (otherParticipants[0]) {  // <--- This is the crucial check!
                            const otherParticipant = await fetchUserDetails(otherParticipants[0]);
                            return {
                                id: chat._id,
                                name: otherParticipant && otherParticipant.user ? `${otherParticipant.user.firstName} ${otherParticipant.user.lastName}` : 'Unknown', // Check if otherParticipant and user exist
                                messages: chat.messages
                            };
                        } else { // Handle the case where otherParticipants[0] is undefined
                            console.error('No other participants found for chat:', chat._id);
                            return {
                                id: chat._id,
                                name: "Unknown Participant", // Or handle it differently
                                messages: chat.messages
                            };
                        }
    
    
    
                    }));
                    setChats(fetchedChats);
                })
                .catch(error => {
                    console.error("Error fetching chats:", error);
                });
        }
    }, [user]);

    useEffect(() => {
        if (user && selectedChat) {
            socket.emit('joinChat', selectedChat.id);

            const handleReceiveMessage = (message) => {
                if (message.chatId === selectedChat.id) {
                    setMessages((prevMessages) => [...prevMessages, message]);
                }
            };

            socket.off('receiveMessage', handleReceiveMessage); // Remove previous
            socket.on('receiveMessage', handleReceiveMessage);  // Add new one

            return () => {
                socket.off('receiveMessage', handleReceiveMessage); // Cleanup
            };
        }
    }, [selectedChat, user]);

    const handleSendMessage = () => {
        if (selectedChat && message) {
            const newMessage = {
                chatId: selectedChat.id, // Use selectedChat.id
                sender: user._id,
                content: message
            };

            socket.emit('sendMessage', newMessage);

            // setMessages((prevMessages) => [...prevMessages, newMessage]); // Update messages locally

            setMessage('');
        }
    };
    
    const handleStartNewChat = () => {
        if (newChatUser) {
            axios.post(
                'http://localhost:8000/api/chats/create',
                { participants: [user._id, newChatUser] },
                { withCredentials: true }
            )
                .then(response => {
                    const chatData = response.data;

                    if (chatData.participants && chatData.participants.length > 1) { // Check if participants exist
                        const otherParticipant = chatData.participants.find(p => p._id !== user._id);
                        const newChat = {
                            id: chatData._id,
                            name: otherParticipant ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Unknown',
                            messages: [] // Initialize with empty messages array
                        };

                        setChats([...chats, newChat]);
                        setNewChatUser('');
                    } else {
                        console.error('Unexpected chat data format:', chatData);
                    }
                })
                .catch(error => {
                    console.error("Error starting new chat:", error);
                });
        }
    };

    const menuItems = chats.map(chat => ({
        key: chat._id,
        label: (
            <div
                onClick={() => {
                    setSelectedChat(chat)
                }}
                className={`chat-item ${selectedChat && selectedChat._id === chat._id ? 'selected-chat' : ''}`}
                style={{ minHeight: '50px', display: 'flex', alignItems: 'center', padding: '8px' }} // Add padding
            >
                <Avatar style={{ marginRight: '8px' }}>{chat.name.charAt(0)}</Avatar>
                <span>{chat.name}</span>
            </div>
        )
    }));

    return (
        <Layout style={{ height: 'auto', backgroundColor: '#fff' }}>
            <Sider width={300} className="site-layout-background" style={{ padding: '16px', backgroundColor: '#fff' }}> {/* Add padding and change background color */}
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ height: 'calc(100% - 112px)', borderRight: 0, backgroundColor: '#fff' }} // Adjust height and change background color
                    items={menuItems}
                />
                <Form layout="inline" style={{ marginTop: '20px' }}>
                    {user && user.role === "assistant" && (
                        <>
                            <Form.Item>
                                <Select
                                    value={newChatUser}
                                    onChange={(value) => setNewChatUser(value)}
                                    placeholder="Select a patient to start chat"
                                    loading={patientsLoading}
                                    style={{ width: '165px' }}
                                >
                                    {patients.map(patient => (
                                        <Select.Option key={patient._id} value={patient._id}>
                                            {patient.firstName} {patient.lastName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={handleStartNewChat}>
                                    New
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Sider>
            <Layout>
                <Content style={{ margin: '24px 16px 0', overflow: 'auto', backgroundColor: '#fff' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}> {/* Remove justifyContent */}
                        {selectedChat ? (
                            <div style={{ flex: 1, overflow: 'auto' }}> {/* Add overflow for messages */}
                                <div style={{ marginBottom: '16px' }}> {/* Add margin between name and messages */}
                                    <h2>{selectedChat.name}</h2>
                                </div>
                                    <div style={{ flex: 1, overflow: 'auto' }}>
                                    {/* ... (Existing code for chat name) */}
                                    <List
                                        dataSource={messages} // Use messages state here
                                        renderItem={message => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={message.sender === user._id ? "You" : selectedChat.name}
                                                    description={message.content}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                    <div ref={messagesEndRef} /> {/* Empty div for scrolling */}
                                </div>
                            </div>
                        ) : (
                            <h2>Select a chat to start messaging</h2>
                        )}
                        <div style={{ minWidth: '50px', width: '100%', padding: '10px', background: '#fff', borderTop: '1px solid #e8e8e8', display: 'flex', alignItems: 'center' }}>
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onPressEnter={handleSendMessage}
                                placeholder="Type your message here..."
                                style={{ flex: 1, marginRight: '10px' }}
                            />
                            <div className='send-button'>   
                                <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={handleSendMessage}>
                                    Send
                                </Button>
                            </div>

                        </div>

                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Chat;