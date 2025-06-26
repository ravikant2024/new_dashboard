import React from 'react'
import ChatbotIcon from './ChatbotIcon'
import { FaChevronDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import "./ChatBot.css"
const ChatBot = () => {
  return (
    <>
      <div className='chatbot-conatiner'>
        <div className='chatbot-popup'>
          <div className='chatbot-header'>
            <div className='chatbot-header-info'>
              <ChatbotIcon />
              <h2 className='chatbot-logo-text'>original Innovation LLP</h2>
            </div>
            <button>
              <FaChevronDown />
            </button>
          </div>
          <div className='chatbot-chat-body'>
            <div className='message bot-message'>
              <ChatbotIcon />
              <p className='chatbot-message-text'>
                Hey there <br /> How Can I help you?
              </p>
            </div>
            <div className='message user-message'>
              {/* <ChatbotIcon /> */}
              <p className='chatbot-message-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
          {/* Footer */}
          <div className='chatbot-chat-footer'>
            <form className='chat-form'>
              <input type="text" placeholder='Message....' className="message-input"
              required />
              <button>
              <FaArrowUp />
            </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatBot
