import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import ChatbotMessage from '../components/ChatbotMessage';
import { useAppContext } from '../contexts/AppContext';
import { ChatMessage } from '../types';
import { loadChatHistory, saveChatHistory } from '../utils/storage';

const ChatPage: React.FC = () => {
  const { chatHistory, addChatMessage, doctors } = useAppContext();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Load chat history from localStorage on initial mount
  useEffect(() => {
    const savedHistory = loadChatHistory() as ChatMessage[];
  
    if (savedHistory.length === 0) {
      const initialMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'bot',
        content: "Hello! I'm your medical assistant...",
        timestamp: new Date().toISOString()
      };
      setChatHistoryDirectly([initialMessage]); // new method you create in context
    } else {
      setChatHistoryDirectly(savedHistory); // don't loop with addChatMessage
    }
  }, []);
   // Empty dependency array

  // Save to localStorage whenever chat history changes
  useEffect(() => {
    saveChatHistory(chatHistory);
  }, [chatHistory]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);
  
  const sendMessage = async () => {
    if (!message.trim()) return;
    
    try {
      setIsTyping(true);
      
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };
      addChatMessage(userMessage);
      setMessage('');
      
      // Analyze message and generate response
      const lowerMessage = message.toLowerCase();
      const keywords = extractKeywords(lowerMessage);
      const doctorRecommendation = recommendDoctor(keywords);
      
      // Simulate network delay for more natural feeling
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'bot',
        content: generateResponse(lowerMessage, keywords, doctorRecommendation),
        timestamp: new Date().toISOString(),
        keywords,
        doctorId: doctorRecommendation ?? undefined
      };
      addChatMessage(botMessage);
    } catch (error) {
      console.error('Error processing message:', error);
      addChatMessage({
        id: Date.now().toString(),
        sender: 'bot',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsTyping(false);
    }
  };
  
  const extractKeywords = (message: string): string[] => {
    const keywordMap: { [key: string]: string[] } = {
      heart: ['heart', 'chest pain', 'palpitations', 'blood pressure', 'cardiovascular'],
      brain: ['headache', 'migraine', 'dizziness', 'memory', 'neurological', 'brain'],
      children: ['child', 'kid', 'baby', 'infant', 'pediatric', 'children'],
      skin: ['skin', 'rash', 'acne', 'dermatology', 'dermatological', 'eczema'],
      general: ['general', 'checkup', 'tired', 'fatigue', 'fever', 'internal']
    };
    
    const foundKeywords: string[] = [];
    
    Object.entries(keywordMap).forEach(([category, keywords]) => {
      if (keywords.some(keyword => message.includes(keyword))) {
        foundKeywords.push(category);
      }
    });
    
    return foundKeywords;
  };
  
  const recommendDoctor = (keywords: string[]): string | null => {
    // Map keywords to specialties
    const specialtyMap: { [key: string]: string } = {
      heart: 'Cardiology',
      brain: 'Neurology',
      children: 'Pediatrics',
      skin: 'Dermatology',
      general: 'Internal Medicine'
    };
    
    for (const keyword of keywords) {
      const specialty = specialtyMap[keyword];
      if (specialty) {
        const matchingDoctor = doctors.find(doctor => doctor.specialty === specialty);
        return matchingDoctor ? matchingDoctor.id : null;
      }
    }
    
    return null;
  };
  
  const generateResponse = React.useCallback(
    (message: string, keywords: string[], doctorId: string | null): string => {
      // If no keywords were found
      if (keywords.length === 0) {
        return "I'm not sure I understood your symptoms. Could you provide more details about what you're experiencing? For example, where is the pain located, or what symptoms are bothering you?";
      }
      
      // If doctor recommendation was found
      if (doctorId) {
        const doctor = doctors.find(d => d.id === doctorId);
        if (doctor) {
          return `Based on your symptoms, I would recommend seeing ${doctor.name}, one of our ${doctor.specialty} specialists. Would you like me to help you book an appointment with them?`;
        }
      }
      
      // Generic response based on keywords
      if (keywords.includes('heart')) {
        return "It sounds like you might be experiencing heart-related symptoms. I'd recommend seeing one of our cardiologists who can properly evaluate your condition. Would you like me to show you our available cardiologists?";
      } else if (keywords.includes('brain')) {
        return "Those symptoms could be neurological in nature. Our neurologists are experienced in diagnosing and treating conditions like the ones you're describing. Would you like me to recommend a neurologist?";
      } else if (keywords.includes('children')) {
        return "For your child's health concerns, I'd suggest consulting with one of our pediatric specialists who focus exclusively on children's health. Would you like me to show you our pediatricians?";
      } else if (keywords.includes('skin')) {
        return "For skin-related concerns, our dermatologists would be the best specialists to consult. They can diagnose and treat a wide range of skin conditions. Would you like me to help you find a dermatologist?";
      } else if (keywords.includes('general')) {
        return "For general health concerns like these, our internal medicine doctors would be a good place to start. They can provide a comprehensive evaluation and refer you to specialists if needed. Would you like me to help you book with an internist?";
      }
      
      return "Thank you for sharing. Based on what you've told me, I'd recommend speaking with a doctor who can properly evaluate your symptoms. Would you like me to help you find the right specialist?";
    },
    [doctors]
  );
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-blue-800 text-white">
            <h1 className="text-xl font-medium">Medical Assistant</h1>
            <p className="text-sm text-blue-100">
              Describe your symptoms and I'll help you find the right doctor.
            </p>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatHistory.map(message => (
              <ChatbotMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your symptoms or questions here..."
                className="flex-grow py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent resize-none shadow-sm"
                rows={2}
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim() || isTyping}
                className={`p-3 rounded-full flex items-center justify-center transition-all duration-200 ${
                  message.trim() && !isTyping
                    ? 'bg-blue-800 text-white hover:bg-blue-900 shadow-md hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isTyping ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;