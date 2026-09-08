import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function ChatWidget({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste! Ask me about your skill gaps or recommended courses.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

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
    const trimmed = inputMessage.trim();
    if (!trimmed || loading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await api.askChatbot(trimmed);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: res.reply || 'I can help answer questions about your skill gaps and training courses.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chatbot error:', err);
      const errorMsg = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'I am currently having trouble connecting to the AI server. Please ask me about your skill gaps or recommended courses.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-body">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[360px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-ink via-ink-light to-sandstone-dark text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-sandstone/20 text-sandstone flex items-center justify-center border border-sandstone/30">
                <Bot className="w-5 h-5 text-parchment" />
              </div>
              <div>
                <h3 className="font-bold text-sm font-display text-parchment flex items-center space-x-1.5">
                  <span>Skill Setu AI Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-ochre" />
                </h3>
                <p className="text-[10px] text-parchment/70">Personalized MoSPI Competency Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-parchment/80 hover:text-white transition"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scrolling Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8f6f0]/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end space-x-2 max-w-[85%]">
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-sandstone/15 text-sandstone-dark flex items-center justify-center text-[10px] shrink-0 mb-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-sandstone text-white rounded-br-none shadow-sm'
                        : 'bg-white text-ink border border-slate/15 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-ink/10 text-ink flex items-center justify-center text-[10px] shrink-0 mb-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate/70 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-slate text-xs bg-white p-3 rounded-2xl border border-slate/15 max-w-[70%]">
                <Loader2 className="w-4 h-4 text-sandstone animate-spin" />
                <span className="text-[11px] font-medium">Analyzing competency profile...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate/15 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask about your gaps or courses..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-2xl border border-slate/20 text-xs focus:border-sandstone outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2.5 rounded-2xl bg-sandstone text-white hover:bg-sandstone-dark disabled:opacity-40 transition shadow-sm"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Circular Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-liquid-glass w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center hover:scale-110 transition transform"
        aria-label="Toggle AI Support Chat"
        title="AI Learner Support"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
