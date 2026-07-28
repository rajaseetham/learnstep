import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, HelpCircle, Lightbulb, Zap } from 'lucide-react';

export const StepAITutor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! I'm StepAI, your Computer Science learning buddy 🤖 Ask me any doubts, ask for fun analogies, or request extra examples!",
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (textToSend === input) setInput('');
    setIsTyping(true);

    // AI Response Generator
    setTimeout(() => {
      let reply = "";
      const lower = textToSend.toLowerCase();

      if (lower.includes('binary') || lower.includes('0') || lower.includes('1')) {
        reply = "Imagine a room with millions of light switches! 💡 When a switch is UP, it's ON (1). When it's DOWN, it's OFF (0). That's binary! Computers combine these tiny switches to store pictures, play music, and run games!";
      } else if (lower.includes('router') || lower.includes('internet') || lower.includes('packet')) {
        reply = "Think of a Router as a super-fast postal worker 📮 at a mail sorting station! When you send a message, it gets chopped into tiny envelopes called 'packets'. The router looks at the IP address on each packet and sends it down the quickest wire highway!";
      } else if (lower.includes('java') || lower.includes('object') || lower.includes('class')) {
        reply = "Think of a Class like a cookie cutter 🍪, and an Object like the actual cookie! The cookie cutter defines the shape, but you can bake 100 cookies (objects) using that single cutter!";
      } else if (lower.includes('cpu') || lower.includes('brain')) {
        reply = "The CPU (Central Processing Unit) is the chief brain of the computer! 🧠 It can do billions of math problems every single second. Whenever you press a key or tap a screen, the CPU does the quick math to show what happens next!";
      } else if (lower.includes('quiz') || lower.includes('answer')) {
        reply = "I can't give away direct quiz answers because discovering it yourself earns you maximum XP! 🌟 But here's a hint: think about how data gets broken into smaller pieces before traveling across wires!";
      } else {
        reply = `Great question about "${textToSend}"! 🚀 In computer science, everything complex is just a team of small, simple steps working together. Would you like a real-life analogy or a code example for this?`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const sampleQuestions = [
    "Why do computers use 0s and 1s?",
    "Explain a Router like I am 10 years old 📮",
    "What is a CPU?",
    "Give me a real-life analogy for Java Class 🍪"
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          background: 'linear-gradient(135deg, #6C5CE7 0%, #00B894 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '99px',
          padding: '14px 22px',
          fontFamily: 'var(--font-heading)',
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(108, 92, 231, 0.45)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        className="animate-pulse-glow"
      >
        <Bot size={24} />
        <span>Ask StepAI</span>
        <span style={{
          background: '#FFEAA7',
          color: '#D63031',
          fontSize: '0.7rem',
          fontWeight: 800,
          padding: '2px 8px',
          borderRadius: '99px'
        }}>TUTOR</span>
      </button>

      {/* Slide-Out Chat Drawer */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '24px',
          width: '380px',
          maxHeight: '560px',
          height: '80vh',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }} className="glass-card">
          
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #6C5CE7 0%, #8C7AE6 100%)',
            color: 'white',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '8px',
                borderRadius: '12px'
              }}>
                <Bot size={22} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>StepAI Assistant</h4>
                <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>Always ready to explain & inspire</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Messages Feed */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: 'var(--bg-main)'
          }}>
            {messages.map(msg => (
              <div 
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                <div style={{
                  background: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-card)',
                  color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  boxShadow: 'var(--shadow-sm)',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
                <span style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  display: 'block',
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  marginTop: '4px',
                  padding: '0 4px'
                }}>
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '4px', padding: '12px', background: 'var(--bg-card)', borderRadius: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>StepAI is thinking... 🧠</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div style={{ padding: '8px 12px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {sampleQuestions.slice(0, 2).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                style={{
                  whiteSpace: 'nowrap',
                  background: 'rgba(108, 92, 231, 0.08)',
                  color: 'var(--primary)',
                  border: 'none',
                  borderRadius: '99px',
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer'
                }}
              >
                💡 {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div style={{
            padding: '12px',
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              placeholder="Ask a doubt or request an analogy..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '99px',
                border: '1px solid var(--border-color)',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                background: 'var(--bg-main)',
                color: 'var(--text-main)'
              }}
            />
            <button
              onClick={() => handleSend()}
              style={{
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
