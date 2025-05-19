import React from 'react';
import { UserCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatbotMessageProps {
  message: ChatMessage;
}

const ChatbotMessage: React.FC<ChatbotMessageProps> = ({ message }) => {
  return (
    <div 
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {message.sender === 'bot' && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
          <span className="text-blue-800 text-sm font-semibold">M</span>
        </div>
      )}
      
      <div 
        className={`max-w-[75%] rounded-lg px-4 py-3 ${
          message.sender === 'user' 
            ? 'bg-blue-800 text-white rounded-tr-none' 
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p className="text-xs opacity-70 mt-1 text-right">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {message.sender === 'user' && (
        <div className="ml-2 flex-shrink-0">
          <UserCircle className="w-8 h-8 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default ChatbotMessage;