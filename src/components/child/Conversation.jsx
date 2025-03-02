import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Conversation = ({setSelectedConversation, setIsLoading, setSidebarActive, setMobileMenu}) => {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const savedToken = localStorage.getItem('authToken');
    // {/* Fetch Conversation */}
    useEffect(() => {
        const fetchConversations = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/conversations`, {
                    headers: {
                        'Authorization': 'Bearer ' + savedToken
                    }
                });
                setConversations(response.data);
                const latestConversation = response.data.reduce((max, conversation) => conversation.id > max.id ? conversation : max, response.data[0]);
                // setLastConversation(latestConversation);
                // console.log(latestConversation);

                // Fetch messages after fetching conversations
                const fetchMessages = async () => {
                    try {
                        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/messages/${latestConversation.id}`, {
                            headers: {
                                'Authorization': 'Bearer ' + savedToken
                            }
                        });
                        // setMessages(response.data);
                    } catch (error) {
                        setIsLoading(false);
                        console.error('Error fetching messages:', error);
                    }
                };
                fetchMessages();
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching conversations:', error);
            }
        };
        fetchConversations();
    }, [savedToken]);
    // {/* End Fetch Users */}
    // {/* Handle Selected Conversation */}
    const handleSelectedConversation = (conversation) => {
        setSelectedConversation(conversation);
        setIsLoading(true);
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/messages/${conversation.id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + savedToken
                    }
                });
                setMessages(response.data);
                setSidebarActive(false);
                setMobileMenu(false);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }
    // {/* End Handle Selected Conversation */}
    return (
        <ul className="ai-chat-list scroll-sm pe-24 ps-24 pb-24">
            <li className="mb-16 mt-0">
                <span className="text-primary-600 text-sm fw-semibold">Latest Chats</span>
            </li>
            {conversations.map((conversation) => (
            <li className="mb-12" key={conversation.id}>
                <Link
                    onClick={() => handleSelectedConversation(conversation)}
                    className="text-line-1 text-secondary-light text-hover-primary-600-custom text-sm"
                >
                    {conversation.title}
                </Link>
            </li>
            ))}
        </ul>
        
    );
    }

export default Conversation;