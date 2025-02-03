import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { HashLoader } from 'react-spinners';
// import { set } from 'react-datepicker/dist/date_utils';

const TextGeneratorNewChatLayer = ({selectedConversation, setIsLoading, isLoading}) => {
    const [conversations, setConversations] = useState([]);
    const [lastConversation, setLastConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const savedToken = localStorage.getItem('authToken');
    
    useEffect(() => {
        const fetchConversations = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/chat/conversations', {
              headers: {
                'Authorization': 'Bearer ' + savedToken
              }
            });
            setConversations(response.data);
            if (selectedConversation) {
              handleSelectedConversation(selectedConversation);
            } else {
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Error fetching conversations:', error);
            setIsLoading(false);
          }
        };
    
        fetchConversations();
      }, [selectedConversation, savedToken]);    
    
    const handleSelectedConversation = () => {
        setLastConversation(selectedConversation);
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/chat/messages/${selectedConversation.id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + savedToken
                    }
                });
                setMessages(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setIsLoading(false);
            }
        };
        fetchMessages();
    }    
    
    useEffect(() => {
        if(!selectedConversation) {
            if (lastConversation) {
                handleMessage();
            }
        }
    }, [lastConversation, selectedConversation]);

    const handleMessageRequest = async () => {
        setIsLoading(true);
        try {
            if (lastConversation) {
                handleMessage();
            } else {
                handleNewConversation();
            }  
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
            alert('An error occurred during message creation. Please try again later.');
        }
    }

    const handleNewConversation = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/chat/conversations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + savedToken
                },
                body: JSON.stringify({ title : 'New Conversation' }),
            });
            const data = await response.json();
            if (response.ok) {
                setLastConversation(data);
            } else {
                alert('An error occurred during conversation creation. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during conversation creation. Please try again later.');
        }
    }

    const handleMessage = async () => {
        const response = await fetch(`http://localhost:5000/api/chat/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + savedToken
            },
            body: JSON.stringify({ content: messageContent, conversationId: lastConversation.id }),
        });
        if (response.ok) {
            setMessageContent('');
            const fetchMessages = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/chat/messages/${lastConversation.id}`, {
                        headers: {
                            'Authorization': 'Bearer ' + savedToken
                        }
                    });
                    setMessages(response.data);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                    setIsLoading(false);
                }
            };
            fetchMessages();
        } else {
            alert('An error occurred during message creation. Please try again later.');
            setIsLoading(false);
        }
    }

    return (
        <div className="row gy-4 flex-wrap-reverse">
            <div className="col-xxl-12 col-lg-12" style={{ maxWidth: '100%' }}>
                <div className="chat-main card overflow-hidden">
                    {lastConversation && (
                    <div className="chat-sidebar-single gap-8 justify-content-between cursor-default flex-nowrap">
                        <div className="d-flex align-items-center gap-16">
                            <Link
                                to="/text-generator-new"
                                className="text-primary-light text-lg line-height-1"
                            >
                                <i className="ri-arrow-left-line" />
                            </Link>
                            <h6 className="text-sm mb-0 text-line-1">
                                {lastConversation.title}
                            </h6>
                        </div>
                        <div className="d-flex align-items-center gap-16 flex-shrink-0">
                            <button
                                type="button"
                                className="text-secondary-light text-lg line-height-1 text-hover-primary-600"
                            >
                                <i className="ri-edit-2-line" />
                            </button>
                            <button
                                type="button"
                                className="text-secondary-light text-lg line-height-1 text-hover-primary-600"
                            >
                                <i className="ri-delete-bin-6-line" />
                            </button>
                        </div>
                    </div>
                    )}
                    <div className="chat-message-list max-h min-h" style={{ overflowY: 'auto' }}>
                        {/* if isLoading is true show loading */}
                        {isLoading && ( 
                            <div className='loading-overlay d-flex justify-content-center align-items-center'>
                                <HashLoader /> 
                            </div>
                        )}
                        {!isLoading && messages.length === 0 && (
                            <div className="d-flex justify-content-center align-items-center min-h">
                                <p className="text-secondary-light">No messages yet. Start the conversation!</p>
                            </div>
                        )}
                        {messages.map((message) => (
                            message.role === 'user' ? 
                            <div className="d-flex align-items-end justify-content-end gap-16 border-bottom border-neutral-200 pb-16 mb-16 flex-wrap" key={message.id}>
                            <button
                                type="button"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                                className="d-flex align-items-center gap-6 px-8 py-4 bg-neutral-200 radius-8 bg-hover-primary-100 flex-shrink-0"
                            >
                                <i className="ri-edit-2-fill" />
                            </button>
                            <div className="d-flex bg-neutral-200 radius-8 align-items-center border-neutral-200"
                            style={{ padding: '6px 16px' }}>
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
                            <div className="message-container d-flex align-items-start gap-16 border-bottom border-neutral-200 pb-16 mb-16 position-relative flex-wrap" key={message.id}>
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
                                    <div className="mt-24 d-flex align-items-center gap-8">
                                        <div className="d-flex align-items-center gap-8 radius-8 px-8 py-4 line-height-1">
                                            <button
                                                type="button"
                                                className="text-secondary-light text-lg d-flex text-hover-info-600"
                                            >
                                                <i className="ri-thumb-up-line line-height-1" />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-secondary-light text-lg d-flex text-hover-info-600"
                                            >
                                                <i className="ri-thumb-down-line" />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-secondary-light text-lg d-flex text-hover-info-600"
                                            >
                                                <i className="ri-share-forward-line" />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-secondary-light text-lg d-flex text-hover-info-600"
                                            >
                                                <i className="ri-file-copy-line" />
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary d-flex align-items-center gap-4 btn-sm"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="Regenerate"
                                        >
                                            <i className="ri-repeat-2-line" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))    
                        }
                    </div>
                    <div className="chat-message-box d-flex align-items-center gap-16 flex-wrap">
                        <div className="d-flex justify-content-start flex-grow-1">
                            <textarea
                                name="chatMessage"
                                value={messageContent}
                                placeholder="Message Nevver..."
                                onChange={(e) => setMessageContent(e.target.value)}
                                className="form-control"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div className="d-flex justify-content-end">
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

export default TextGeneratorNewChatLayer