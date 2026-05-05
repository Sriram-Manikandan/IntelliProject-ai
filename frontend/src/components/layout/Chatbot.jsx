import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { chatWithRecruit } from '../../services/api';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Recruit. Need help brainstorming or refining your project? Ask me anything!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Send the last 10 messages to keep context window small
      const contextMessages = newMessages.slice(-10);
      const data = await chatWithRecruit(contextMessages);
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Oops, I encountered an error connecting to my servers. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:scale-105 hover:bg-indigo-500 transition-all z-50 ${isOpen ? 'hidden' : 'block'}`}
        aria-label="Open chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-50 ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Recruit AI</h3>
              <p className="text-[10px] text-emerald-400 font-medium">Online</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-purple-500/20' : 'bg-indigo-500/20'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-purple-400" /> : <Bot className="w-4 h-4 text-indigo-400" />}
              </div>
              <div className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-sm'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                <span className="text-xs text-gray-400">Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white/5 border-t border-white/10">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Recruit..."
              className="w-full bg-black border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white disabled:opacity-50 disabled:bg-gray-600 transition-colors"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
