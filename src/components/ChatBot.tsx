import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CRYPTO_LEGAL_RESPONSES = {
  default: "I can help you with questions about cryptocurrency regulations and legal matters. Please be specific with your question.",
  regulations: "Cryptocurrency regulations vary by jurisdiction. In general, most countries require cryptocurrency exchanges to register with financial authorities and comply with KYC/AML regulations.",
  tax: "Cryptocurrency transactions are generally subject to capital gains tax. It's important to keep detailed records of all your crypto transactions for tax purposes.",
  defi: "DeFi platforms operate in a regulatory grey area. While they offer innovative financial services, they may be subject to securities laws depending on their specific features.",
  nft: "NFTs face evolving legal frameworks. Key considerations include intellectual property rights, securities laws, and tax implications.",
  mining: "Cryptocurrency mining regulations vary by location. Key legal considerations include energy regulations, business registration, and tax obligations.",
  security: "Cryptocurrency security best practices include using hardware wallets, enabling 2FA, and keeping private keys secure. Legal requirements may include cybersecurity compliance.",
  ico: "Initial Coin Offerings (ICOs) are heavily regulated in most jurisdictions. They may be subject to securities laws and require proper registration with authorities."
};

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('regulation') || lowerMessage.includes('legal')) {
    return CRYPTO_LEGAL_RESPONSES.regulations;
  } else if (lowerMessage.includes('tax')) {
    return CRYPTO_LEGAL_RESPONSES.tax;
  } else if (lowerMessage.includes('defi') || lowerMessage.includes('decentralized')) {
    return CRYPTO_LEGAL_RESPONSES.defi;
  } else if (lowerMessage.includes('nft')) {
    return CRYPTO_LEGAL_RESPONSES.nft;
  } else if (lowerMessage.includes('mining')) {
    return CRYPTO_LEGAL_RESPONSES.mining;
  } else if (lowerMessage.includes('security') || lowerMessage.includes('protect')) {
    return CRYPTO_LEGAL_RESPONSES.security;
  } else if (lowerMessage.includes('ico') || lowerMessage.includes('token')) {
    return CRYPTO_LEGAL_RESPONSES.ico;
  }
  
  return CRYPTO_LEGAL_RESPONSES.default;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (!trimmedInput || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: trimmedInput }]);
    setIsOpen(true);
    setIsLoading(true);

    // Simulate network delay for more natural feeling
    setTimeout(() => {
      const response = getResponse(trimmedInput);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 500);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 flex items-center">
        <div className="bg-white rounded-lg shadow-lg mr-3 flex items-center">
          <div className="pl-4 pr-2 py-2 border-r border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask our AI Crypto Legal Assistant..."
              className="flex-1 p-2 focus:outline-none min-w-[300px]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-secondary transition-colors"
            >
              Ask
            </button>
          </form>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary text-white p-2 rounded-full shadow-lg hover:bg-secondary transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
      <div className="p-4 bg-primary text-white rounded-t-lg flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Legal Assistant</h2>
          <p className="text-sm opacity-80">Ask about crypto regulations</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            👋 Hello! I'm your crypto legal assistant. How can I help you today?
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}