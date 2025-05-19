const CHAT_HISTORY_KEY = 'medical_chat_history';

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

export const loadChatHistory = (): ChatMessage[] => {
  try {
    const saved = localStorage.getItem(CHAT_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
};

export const saveChatHistory = (history: ChatMessage[]): void => {
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};