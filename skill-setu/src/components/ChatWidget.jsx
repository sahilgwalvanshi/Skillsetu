import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, Mic, MicOff, Volume2, Globe } from 'lucide-react';
import { api } from '../services/api';

export default function ChatWidget({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState('hi'); // 'hi' | 'en'

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste! I am Setu Saathi (सेतु साथी). Ask me about your skill decay risk, priority gaps, or recommended iGOT/NSSTA courses in English or Hindi.',
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

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);

    // Realistic simulation of multilingual speech recognition for MoSPI field officers
    const simulatedVoiceQueries = voiceLang === 'hi'
      ? 'मेरी Python और NSSO सर्वे सैंपलिंग स्किल में कितना डिके हुआ है और कौन सा कोर्स तुरंत लेना चाहिए?'
      : 'What is my current Python skill decay rate, and which iGOT refresher course bridges this gap?';

    setTimeout(() => {
      setInputMessage(simulatedVoiceQueries);
      setIsListening(false);
    }, 1400);
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
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
      let replyText = '';
      
      // Deterministic bilingual response for simulated voice query if relevant
      if (trimmed.includes('डिके') || trimmed.includes('decay')) {
        replyText = voiceLang === 'hi'
          ? 'आपके प्रोफ़ाइल विश्लेषण के अनुसार: आपकी Python Wrangle क्षमता में पिछले 240 दिनों में 28% डिके (Decay, λ = 0.115) हुआ है। मिनिमम ऑपरेटिंग बेंचमार्क (3.5) बनाए रखने के लिए "iGOT: Python for Survey Microdata Wrangling" कोर्स तुरंत शुरू करने की सिफ़ारिश की जाती है।'
          : 'Based on your Competency Half-Life profile: Your Python & Survey Wrangling score has experienced 28% decay (λ = 0.115) after 240 days of inactivity. We recommend taking "iGOT: Python for Survey Microdata Wrangling" immediately to restore your score from 2.4 to 3.8.';
      } else {
        const res = await api.askChatbot(trimmed);
        replyText = res.reply || 'I can help answer questions about your skill gaps, decay velocity, and training courses.';
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chatbot error:', err);
      const errorMsg = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'I am currently having trouble connecting to the AI server. Please ask me about your skill gaps, decay projections, or recommended courses.',
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
        <div className="mb-4 w-[360px] sm:w-[420px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-ink via-ink-light to-sandstone-dark text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-sandstone/20 text-sandstone flex items-center justify-center border border-sandstone/30">
                <Bot className="w-5 h-5 text-parchment" />
              </div>
              <div>
                <h3 className="font-bold text-sm font-display text-parchment flex items-center space-x-1.5">
                  <span>Setu Saathi (सेतु साथी)</span>
                  <Sparkles className="w-3.5 h-3.5 text-ochre" />
                </h3>
                <p className="text-[10px] text-parchment/70">Voice & Multilingual AI Cadre Support</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Language Toggle */}
              <button
                onClick={() => setVoiceLang(prev => prev === 'hi' ? 'en' : 'hi')}
                className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-parchment text-[10px] font-bold border border-white/20 transition flex items-center space-x-1"
                title="Toggle Voice Language (Hindi / English)"
              >
                <Globe className="w-3 h-3 text-amber-400" />
                <span>{voiceLang === 'hi' ? 'हिन्दी' : 'EN'}</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-parchment/80 hover:text-white transition"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Voice Listening Bar Alert */}
          {isListening && (
            <div className="bg-amber-400 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between animate-pulse">
              <div className="flex items-center space-x-2">
                <Mic className="w-4 h-4 text-slate-950" />
                <span>Listening ({voiceLang === 'hi' ? 'हिंदी में बोलिए...' : 'Listening in English...'})</span>
              </div>
              <span className="font-mono text-sm tracking-widest">ılı.lı.lllı</span>
            </div>
          )}

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
                <span className="text-[11px] font-medium">Analyzing competency profile & decay...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form with Voice Button */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate/15 flex items-center space-x-2">
            {/* Voice Input Mic Button */}
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2.5 rounded-2xl border transition shadow-xs ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="Voice Input (Speech-to-Text for Field Officers)"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder={voiceLang === 'hi' ? 'डिके या कोर्स के बारे में पूछें...' : 'Ask about gaps, decay, or courses...'}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-2xl border border-slate/20 text-xs focus:border-sandstone outline-none disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2.5 rounded-2xl bg-sandstone text-white hover:bg-sandstone-dark disabled:opacity-40 transition shadow-sm cursor-pointer"
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
        className="btn-liquid-glass w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center hover:scale-110 transition transform cursor-pointer"
        aria-label="Toggle AI Support Chat"
        title="Setu Saathi (AI Learner Support)"
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
