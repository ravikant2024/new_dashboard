import React, { useState } from 'react'
import "../../chat/components/chat.css"
import { BsSend } from "react-icons/bs";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const Chat = () => {
    const [showChat, setShowChat] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const toggleChat = () => {
        setShowChat(!showChat);
    };
    return (
        <>
            {/* Chat Button */}
            <div className="chat-icon" onClick={toggleChat}>
            <IoChatbubbleEllipsesOutline />

            </div>

            {/* Chat Modal */}
            {showChat && (
                <div className={`chat-container open`}>
                    <div className="chat-header">
                        <h2 className="chat-title">Original Innovation LLP</h2>
                        <button className="close-chat-button" onClick={toggleChat}>×</button>
                    </div>
                    <div className="chat-messages">
                        <div className="message bot-message">
                            <p className="message-text">Hi there 👋 If you need any assistance, I'm always here.</p>
                        </div>
                        <div className="message bot-message">
                            <p className="message-text">May I know your name?</p>
                            <div className="input-container">
                                <input type="text" className="input-field" placeholder="Please fill in this field" />
                                <button className="chat-submit-button">Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="chat-input-area">
                        <input
                            type="text"
                            className="chat-input with-icon"
                            placeholder="Write a reply..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        {inputValue.trim() ? (
                            <button className="send-msg-icon">
                              <BsSend />
                            </button>
                        ) : (
                            <button className="send-msg-button">☰</button>
                        )}
                    </div>

                </div>
            )}
        </>
    )
}

export default Chat
