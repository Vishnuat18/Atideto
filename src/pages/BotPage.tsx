import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp,
  SquarePen,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Rocket,
  Bot,
  GraduationCap,
  Coins,
  Zap,
  MapPin,
  Sun,
  CloudSun,
  Moon,
  ChevronDown,
  ShieldCheck,
  Cpu,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/seo/SEO';
import LadoAvatar from '@/components/lado/LadoAvatar';
import {
  ChatMessage,
  PREDEFINED_QUESTIONS,
  QuickQuestion,
  getTimeBasedGreeting,
  getLadoResponse,
} from '@/components/lado/ladoKnowledge';

export default function BotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down'>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const timeInfo = getTimeBasedGreeting();

  useEffect(() => {
    window.scrollTo(0, 0);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleStartNewChat = () => {
    setMessages([]);
    setInputVal('');
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedback((prev) => ({
      ...prev,
      [id]: prev[id] === type ? undefined! : type,
    }));
  };

  const handleSendQuickQuestion = (q: QuickQuestion) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q.queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const ladoMsg: ChatMessage = {
        id: `lado-${Date.now()}`,
        sender: 'lado',
        text: q.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionText: q.actionText,
        actionHref: q.actionHref,
      };
      setMessages((prev) => [...prev, ladoMsg]);
    }, 450);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getLadoResponse(query);
      const ladoMsg: ChatMessage = {
        id: `lado-${Date.now()}`,
        sender: 'lado',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionText: response.actionText,
        actionHref: response.actionHref,
      };
      setMessages((prev) => [...prev, ladoMsg]);
    }, 500);
  };

  const handleActionClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
    }
  };

  const renderQuickIcon = (iconName: QuickQuestion['iconName']) => {
    switch (iconName) {
      case 'rocket':
        return <Rocket size={18} className="text-[#38BDF8]" />;
      case 'bot':
        return <Bot size={18} className="text-[#A78BFA]" />;
      case 'graduation-cap':
        return <GraduationCap size={18} className="text-[#34D399]" />;
      case 'coins':
        return <Coins size={18} className="text-[#FBBF24]" />;
      case 'zap':
        return <Zap size={18} className="text-[#F472B6]" />;
      case 'map-pin':
        return <MapPin size={18} className="text-[#60A5FA]" />;
      default:
        return <Sparkles size={18} className="text-[#38BDF8]" />;
    }
  };

  const renderTimeIcon = (icon: 'sun' | 'cloud-sun' | 'moon' | 'sparkles') => {
    switch (icon) {
      case 'sun':
        return <Sun size={14} className="text-amber-400" />;
      case 'cloud-sun':
        return <CloudSun size={14} className="text-sky-400" />;
      case 'moon':
        return <Moon size={14} className="text-indigo-400" />;
      case 'sparkles':
      default:
        return <Sparkles size={14} className="text-cyan-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col pt-20 sm:pt-24 selection:bg-[#00C6FF]/30">
      <SEO
        title="Lado AI Assistant | Atideto"
        description="Interact with Lado, Atideto's intelligent AI Assistant for custom software consulting, project estimates, and Academy guidance."
        url="https://atideto.in/bot"
      />

      {/* Blueprint grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 30%, rgba(0, 198, 255, 0.08) 0%, rgba(5, 5, 5, 0) 70%),
            linear-gradient(to right, rgba(46, 168, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(46, 168, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px'
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col h-[calc(100vh-100px)] py-4">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-[#0D1117]/90 border border-white/10 backdrop-blur-xl mb-4 shadow-lg">
          <div className="flex items-center gap-3">
            <LadoAvatar size="md" isInteractive={false} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-white font-montserrat tracking-tight">
                  Lado AI Assistant
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00C6FF]/15 border border-[#00C6FF]/40 text-[#38BDF8]">
                  v4.5 Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Powered by Atideto Neural Intelligence Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStartNewChat}
              className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <SquarePen size={14} />
              <span className="hidden sm:inline">New Session</span>
            </button>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 rounded-2xl bg-[#0B0F17]/80 border border-white/10 backdrop-blur-md space-y-6 shadow-2xl relative mb-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col justify-between py-6">
              
              {/* Welcome Banner */}
              <div className="flex flex-col items-center text-center my-auto">
                <div className="mb-4 relative">
                  <LadoAvatar size="xl" isInteractive={false} isFloating={true} />
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-slate-300 mb-3 shadow-sm">
                  {renderTimeIcon(timeInfo.icon)}
                  <span>{timeInfo.greeting}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight max-w-lg font-montserrat">
                  How can Atideto power your digital transformation today?
                </h2>
                <p className="text-sm text-slate-400 max-w-md mt-2 leading-relaxed">
                  Ask me anything regarding custom software engineering, AI agent pipelines, mobile app development, or Atideto Academy courses.
                </p>
              </div>

              {/* Predefined Prompt Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                {PREDEFINED_QUESTIONS.slice(0, 4).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSendQuickQuestion(q)}
                    className="p-4 rounded-xl border border-white/10 bg-[#141923]/90 hover:bg-[#1C2331] hover:border-[#00C6FF]/60 text-left transition-all duration-200 group cursor-pointer flex flex-col justify-between min-h-[110px] shadow-sm hover:shadow-[0_0_20px_rgba(0,198,255,0.15)]"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="p-2 rounded-lg bg-white/[0.06] group-hover:bg-[#00C6FF]/15 transition-colors">
                        {renderQuickIcon(q.iconName)}
                      </span>
                      <span className="text-slate-500 group-hover:text-[#00C6FF] transition-colors">
                        <ArrowUp size={15} className="rotate-45" />
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-white transition-colors">
                        {q.title}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 mt-1">
                        {q.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* Conversation Stream */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group/msg`}
              >
                <div
                  className={`rounded-2xl px-5 py-4 leading-relaxed text-sm max-w-[85%] sm:max-w-[75%] transition-all ${
                    isUser
                      ? 'bg-[#1D68FE] text-white rounded-tr-sm shadow-[0_4px_20px_rgba(29,104,254,0.35)]'
                      : 'bg-[#141A26] border border-white/15 text-slate-100 rounded-tl-sm shadow-md'
                  }`}
                >
                  {!isUser && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10 text-xs text-[#38BDF8] font-semibold">
                      <LadoAvatar size="sm" isInteractive={false} />
                      <span>Lado Assistant</span>
                    </div>
                  )}

                  <div className="whitespace-pre-line leading-relaxed font-normal">
                    {msg.text}
                  </div>

                  {msg.actionText && msg.actionHref && (
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <button
                        onClick={() => handleActionClick(msg.actionHref!)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0052FF] hover:bg-[#0042CC] text-white shadow-[0_0_15px_rgba(0,82,255,0.4)] active:scale-95 transition-all cursor-pointer"
                      >
                        <span>{msg.actionText}</span>
                        <ExternalLink size={13} />
                      </button>
                    </div>
                  )}
                </div>

                {!isUser && (
                  <div className="flex items-center gap-3 mt-2 px-1 text-slate-400 opacity-80 group-hover/msg:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.text)}
                      className="text-xs flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check size={13} className="text-emerald-400" />
                          <span className="text-[11px] text-emerald-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleFeedback(msg.id, 'up')}
                      className={`hover:text-white transition-colors cursor-pointer ${
                        feedback[msg.id] === 'up' ? 'text-emerald-400' : ''
                      }`}
                    >
                      <ThumbsUp size={13} />
                    </button>

                    <button
                      onClick={() => handleFeedback(msg.id, 'down')}
                      className={`hover:text-white transition-colors cursor-pointer ${
                        feedback[msg.id] === 'down' ? 'text-rose-400' : ''
                      }`}
                    >
                      <ThumbsDown size={13} />
                    </button>

                    <span className="text-[11px] text-slate-500 ml-auto">
                      {msg.timestamp}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#141A26] border border-white/10 w-fit text-slate-300">
              <LadoAvatar size="sm" isInteractive={false} />
              <div className="flex items-center gap-1.5 py-1">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" style={{ animationDelay: '200ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-2 sm:p-3 rounded-2xl bg-[#0D1117] border border-white/15 shadow-xl">
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center rounded-xl bg-[#141A26] border border-white/10 focus-within:border-[#00C6FF] transition-all p-1.5"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask Lado about services, technology, project estimates, or Academy..."
              className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder:text-slate-500 text-sm focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-white text-black hover:bg-slate-200 disabled:opacity-30 disabled:bg-white/20 disabled:text-white/40 flex items-center justify-center shrink-0 transition-all cursor-pointer font-bold shadow-md"
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
