import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
// import { set } from 'react-datepicker/dist/date_utils';
// import { set } from 'react-datepicker/dist/date_utils';

const TextGeneratorLayer = () => {
    const [conversations, setConversations] = useState([]);
    const [lastConversation, setLastConversation] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const savedToken = localStorage.getItem('authToken');
    // {/* Fetch Conversation */}
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/conversations`, {
                    headers: {
                        'Authorization': 'Bearer ' + savedToken
                    }
                });
                setConversations(response.data);
                const latestConversation = response.data.reduce((max, conversation) => conversation.id > max.id ? conversation : max, response.data[0]);
                setLastConversation(latestConversation);
                console.log(latestConversation);

                // Fetch messages after fetching conversations
                const fetchMessages = async () => {
                    try {
                        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/messages/${latestConversation.id}`, {
                            headers: {
                                'Authorization': 'Bearer ' + savedToken
                            }
                        });
                        setMessages(response.data);
                    } catch (error) {
                        console.error('Error fetching messages:', error);
                    }
                };
                fetchMessages();
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };
        fetchConversations();
    }, [savedToken]);
    // {/* End Fetch Users */}
    const handleSelectedConversation = (conversation) => {
        setLastConversation(conversation);
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/messages/${conversation.id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + savedToken
                    }
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }
    
    const handleNewConversation = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/conversations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + savedToken
                },
                body: JSON.stringify({ title : 'New Conversation' }),
            });
            if (response.ok) {
                window.location.reload();
            } else {
                alert('An error occurred during conversation creation. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during conversation creation. Please try again later.');
        }
    }
    const handleMessageRequest = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + savedToken
                },
                body: JSON.stringify({ content: messageContent, conversationId: lastConversation.id  }),
            });
            if (response.ok) {
                setMessageContent('');
                // refresh messages
                const fetchMessages = async () => {
                    try {
                        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/messages/${lastConversation.id}`, {
                            headers: {
                                'Authorization': 'Bearer ' + savedToken
                            }
                        });
                        setMessages(response.data);
                    } catch (error) {
                        console.error('Error fetching messages:', error);
                    }
                };
                fetchMessages();
            } else {
                alert('An error occurred during message creation. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during message creation. Please try again later.');
        }
    }
    return (
        <div className="row gy-4 flex-wrap-reverse">
            <div className="col-xxl-3 col-lg-4" style={{ maxWidth: '100%' }}>
                <div className="card h-100 p-0">
                    <div className="card-body p-0">
                        <div className="p-24">
                            <Link
                                onClick={handleNewConversation}
                                className="btn btn-primary text-sm btn-sm px-12 py-12 w-100 radius-8 d-flex align-items-center justify-content-center gap-2"
                            >
                                <i className="ri-messenger-line" />
                                New Chat
                            </Link>
                        </div>
                        <ul className="ai-chat-list scroll-sm pe-24 ps-24 pb-24">
                            <li className="mb-16 mt-0">
                                <span className="text-primary-600 text-sm fw-semibold">Today</span>
                            </li>
                            {conversations.map((conversation) => (
                            <li className="mb-16" key={conversation.id}>
                                <Link
                                    onClick={() => handleSelectedConversation(conversation)}
                                    className="text-line-1 text-secondary-light text-hover-primary-600"
                                >
                                    {conversation.title}
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-xxl-9 col-lg-8" style={{ maxWidth: '100%' }}>
                <div className="chat-main card overflow-hidden">
                    {lastConversation && (
                    <div className="chat-sidebar-single gap-8 justify-content-between cursor-default flex-nowrap">
                        <div className="d-flex align-items-center gap-16">
                            <Link
                                to="/text-generator-new"
                                className="text-primary-light text-2xl line-height-1"
                            >
                                <i className="ri-arrow-left-line" />
                            </Link>
                            <h6 className="text-lg mb-0 text-line-1">
                                {lastConversation.title}
                            </h6>
                        </div>
                        <div className="d-flex align-items-center gap-16 flex-shrink-0">
                            <button
                                type="button"
                                className="text-secondary-light text-xl line-height-1 text-hover-primary-600"
                            >
                                <i className="ri-edit-2-line" />
                            </button>
                            <button
                                type="button"
                                className="text-secondary-light text-xl line-height-1 text-hover-primary-600"
                            >
                                <i className="ri-delete-bin-6-line" />
                            </button>
                        </div>
                    </div>
                    )}
                    <div className="chat-message-list max-h-612-px min-h-612-px">
                        {messages.map((message) => (
                            message.role === 'user' ? 
                            <div className="d-flex align-items-end justify-content-end gap-16 border-bottom border-neutral-200 pb-16 mb-16" key={message.id}>
                            <button
                                type="button"
                                className="d-flex align-items-center gap-6 px-8 py-4 bg-primary-50 radius-4 bg-hover-primary-100 flex-shrink-0"
                            >
                                <i className="ri-edit-2-fill" /> Edit
                            </button>
                            <div className="d-flex align-items-center gap-16">
                                <div className="img overflow-hidden flex-shrink-0">
                                {/* <img
                                    src="assets/images/chat/1.png"
                                    alt="image_icon"
                                    className="w-44-px h-44-px rounded-circle object-fit-cover"
                                /> */}
                                </div>
                                <div className="info flex-grow-1 text-end">
                                {/* <h6 className="text-lg mb-4">{message.role === 'user' ? 'User' : 'Nevver'}</h6> */}
                                <p className="mb-0 text-secondary-light text-sm" style={{ wordBreak: 'break-word' }}>
                                    {message.content}
                                </p>
                                </div>
                            </div>
                            </div>
                             : 
                            <div className="d-flex align-items-start gap-16 border-bottom border-neutral-200 pb-16 mb-16" key={message.id}>
                                <div className="img overflow-hidden flex-shrink-0">
                                    <img
                                        src="assets/images/wow-dash-favicon.png"
                                        alt="image_icon"
                                        className="w-22-px h-22-px rounded-circle object-fit-cover"
                                    />
                                </div>
                                <div className="info flex-grow-1">
                                    {/* <h6 className="text-lg mb-16 mt-8">{message.role === 'user' ? 'User' : 'Nevver'}</h6> */}
                                    <p className="mb-16 text-secondary-light text-sm" style={{ wordBreak: 'break-word' }}>
                                        {message.content}
                                    </p>
                                    <div className="mt-24 d-flex align-items-center justify-content-between gap-16">
                                        <div className="d-flex align-items-center gap-20 bg-neutral-50 radius-8 px-16 py-10 line-height-1">
                                            <button
                                                type="button"
                                                className="text-secondary-light text-2xl d-flex text-hover-info-600"
                                            >
                                                <i className="ri-thumb-up-line line-height-1" />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-secondary-light text-2xl d-flex text-hover-info-600"
                                            >
                                                <i className="ri-thumb-down-line" />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-secondary-light text-2xl d-flex text-hover-info-600"
                                            >
                                                <i className="ri-share-forward-line" />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-secondary-light text-2xl d-flex text-hover-info-600"
                                            >
                                                <i className="ri-file-copy-line" />
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary d-flex align-items-center gap-8"
                                        >
                                            {" "}
                                            <i className="ri-repeat-2-line" /> Regenerate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))    
                        }
                    </div>
                    <div className="chat-message-box d-flex align-items-center gap-16">
                        <textarea
                            name="chatMessage"
                            value={messageContent}
                            placeholder="Message Nevver..."
                            onChange={(e) => setMessageContent(e.target.value)}
                            className="form-control"
                        />
                        <div className="d-flex justify-content-end w-100">
                            <button
                                type="button"
                                className="w-44-px h-44-px d-flex justify-content-center align-items-center radius-8 bg-primary-600 text-white bg-hover-primary-700 text-xl"
                                onClick={handleMessageRequest}
                            >
                                <Icon icon="f7:paperplane" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextGeneratorLayer