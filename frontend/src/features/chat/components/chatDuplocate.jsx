import React, { useRef, useEffect, useState } from 'react';
import "../../chat/components/chat.css";
import { BsSend } from "react-icons/bs";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const ChatDuplocate = () => {
  const [showChat, setShowChat] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setShowChat(!showChat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };  

  const generateBotResponse = async (history) => {

    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== 'Thinking...'),
        { role: 'model', text, isError },
      ]);
    };
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL_CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: formattedHistory }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Something went wrong');
      const botText = data.candidates[0].content.parts[0].text.replace(/\*\*(.+?)\*\*/g, '$1').trim();
      updateHistory(botText);
    } catch (err) {
      updateHistory(err.message, true);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setChatHistory((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInputValue('');
    setTimeout(() => {
      setChatHistory((prev) => [...prev, { role: 'model', text: 'Thinking...' }]);
      generateBotResponse([...chatHistory, { role: 'user', text: trimmed }]);
    }, 500);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <>
      {/* Chat Button */}
      <div className="chat-icon" onClick={toggleChat}>
        <IoChatbubbleEllipsesOutline />
      </div>

      {/* Chat Modal */}
      {showChat && (
        <div className="chat-container open">
          <div className="chat-header">
            <h2 className="chat-title">Original Innovation LLP</h2>
            <button className="close-chat-button" onClick={toggleChat}>×</button>
          </div>
          <div className="chat-messages">
            <div className="message bot-message">
              <p className="message-text">Hi there 👋 If you need any assistance, I'm always here.</p>
            </div>

            {chatHistory.map((chat, id) =>
              !chat.hideInChat && (
                <div
                  key={id}
                  className={`message ${chat.role === 'model' ? 'bot-message' : 'user-message'} ${chat.isError ? 'error' : ''}`}
                >
                  <p className="message-text">{chat.text}</p>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chat-input with-icon"
              placeholder="Write a reply..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="send-msg-icon" type="submit">
              <BsSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatDuplocate;
