import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGamification } from '../context/GamificationContext';
import { ArrowLeft, Play, Sparkles, Send, RefreshCw, CheckCircle2, HelpCircle, Lightbulb, Bookmark, FileCode, Check, Server, HardDrive, Cpu, Globe } from 'lucide-react';

export const LessonPage = () => {
  const { id } = useParams();
  const topicId = parseInt(id, 10) || 4;
  const navigate = useNavigate();
  const { topics, bookmarks, toggleBookmark } = useGamification();

  const currentTopic = topics.find(t => t.id === topicId) || topics[3];

  // Router Packet Simulation State (for Topic 4: Internet)
  const [packetStatus, setPacketStatus] = useState('idle'); // idle | moving_r1 | moving_r2 | delivered
  const [packetMessage, setPacketMessage] = useState('Hello Web Server!');
  const [logs, setLogs] = useState([]);

  // Flashcards state
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCard = (cardId) => {
    setFlippedCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const handleSendPacket = () => {
    if (packetStatus !== 'idle' && packetStatus !== 'delivered') return;

    setPacketStatus('moving_r1');
    setLogs(["[00:01] 💻 Client created packet with payload: '" + packetMessage + "'"]);

    setTimeout(() => {
      setPacketStatus('moving_r2');
      setLogs(prev => [...prev, "[00:02] 📮 Router 1 inspected IP address header (192.168.1.1 -> 142.250.190.46)"]);
    }, 1200);

    setTimeout(() => {
      setPacketStatus('delivered');
      setLogs(prev => [...prev, "[00:03] 🌐 Packet safely arrived at Server! HTTP 200 OK Response dispatched."]);
    }, 2400);
  };

  const isBookmarked = bookmarks.includes(topicId);

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        
        {/* Navigation Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <Link to="/roadmap" style={{
            textDecoration: 'none',
            color: 'var(--text-main)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem'
          }}>
            <ArrowLeft size={20} /> Back to Roadmap
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => toggleBookmark(topicId)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '8px 16px',
                borderRadius: '99px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
                color: isBookmarked ? '#FDCB6E' : 'var(--text-main)'
              }}
            >
              <Bookmark size={18} fill={isBookmarked ? "#FDCB6E" : "none"} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <Link to={`/quiz/${topicId}`} className="btn-secondary" style={{ textDecoration: 'none', padding: '10px 24px', fontSize: '1rem' }}>
              <Play size={18} fill="white" /> Take Quiz (+100 XP)
            </Link>
          </div>
        </div>

        {/* Lesson Header Card */}
        <div className="glass-card" style={{
          padding: '36px',
          marginBottom: '36px',
          background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.12) 0%, rgba(116, 185, 255, 0.15) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '2.5rem' }}>{currentTopic.icon}</span>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                LESSON STEP {currentTopic.id}
              </span>
              <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{currentTopic.title}</h1>
            </div>
          </div>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '780px' }}>
            {currentTopic.description}
          </p>

          {/* Learning Objectives */}
          <div style={{
            marginTop: '24px',
            padding: '16px 24px',
            background: 'var(--bg-card)',
            borderRadius: '16px',
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
              <CheckCircle2 size={18} color="#00B894" />
              <span>Understand IP Addresses & Packets</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
              <CheckCircle2 size={18} color="#00B894" />
              <span>Simulate Router Packet Forwarding</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
              <CheckCircle2 size={18} color="#00B894" />
              <span>Master Client vs Server concept</span>
            </div>
          </div>
        </div>

        {/* Content Section 1: Simple Explanation & Real-Life Analogy */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '36px' }}>
          
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>📖</span>
              <h3 style={{ fontSize: '1.3rem', margin: 0 }}>What is the Internet?</h3>
            </div>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.7', fontSize: '1.05rem' }}>
              The Internet is a massive global network of computers connected together using wires, fiber-optic cables, and wireless signals.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1rem', marginTop: '12px' }}>
              When you send a message, play a game, or stream a video, your device sends tiny chunks of data called <strong>Packets</strong> across these wires to servers located anywhere in the world!
            </p>
          </div>

          <div className="glass-card" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(253, 203, 110, 0.15) 0%, rgba(255, 118, 117, 0.1) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Lightbulb size={24} color="#D63031" />
              <h3 style={{ fontSize: '1.3rem', margin: 0, color: '#D63031' }}>Real-Life Analogy: The Postal System 📮</h3>
            </div>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.7', fontSize: '1.05rem' }}>
              Imagine writing a long 100-page book to send to a friend. Instead of mailing one giant box, you tear the book into 100 single pages, put each page in a small envelope, write your friend's home address on every envelope, and drop them in the mail!
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem', marginTop: '12px' }}>
              The postal worker (Router) reads the address on each envelope and forwards them along the fastest delivery routes!
            </p>
          </div>

        </div>

        {/* INTERACTIVE DIGITAL TEXTBOOK SIMULATION: Router & Packet Dispatcher */}
        <div className="glass-card" style={{ padding: '36px', marginBottom: '40px', border: '2px solid var(--primary-light)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="xp-tag" style={{ marginBottom: '10px' }}>
              <Sparkles size={16} fill="#FDCB6E" /> INTERACTIVE SIMULATOR
            </span>
            <h2 style={{ fontSize: '2rem', margin: '8px 0' }}>Click-to-Route Packet Visualizer 📬</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Send a packet from your computer (Client) through network routers to the Target Server!
            </p>
          </div>

          {/* Interactive Control & Visual Graph */}
          <div style={{
            background: 'var(--bg-main)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '24px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              
              {/* Node 1: Client Computer */}
              <div style={{ textAlign: 'center', width: '130px' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #74B9FF, #0984E3)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                  boxShadow: '0 8px 16px rgba(116, 185, 255, 0.4)'
                }}>
                  <Globe size={36} />
                </div>
                <h4 style={{ margin: 0 }}>Your PC</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IP: 192.168.1.100</span>
              </div>

              {/* Wire 1 */}
              <div style={{ flex: 1, minWidth: '80px', height: '4px', background: packetStatus === 'moving_r1' ? '#00B894' : 'var(--border-color)', position: 'relative' }}>
                {packetStatus === 'moving_r1' && (
                  <div style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#00B894',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '99px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }} className="animate-bounce-soft">
                    📦 Packet #1
                  </div>
                )}
              </div>

              {/* Node 2: Router 1 */}
              <div style={{ textAlign: 'center', width: '130px' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '20px',
                  background: packetStatus === 'moving_r1' ? '#00B894' : 'linear-gradient(135deg, #6C5CE7, #8C7AE6)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                  boxShadow: '0 8px 16px rgba(108, 92, 231, 0.4)',
                  transition: 'background 0.3s ease'
                }}>
                  <Cpu size={36} />
                </div>
                <h4 style={{ margin: 0 }}>Router 1</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ISP Gateway</span>
              </div>

              {/* Wire 2 */}
              <div style={{ flex: 1, minWidth: '80px', height: '4px', background: packetStatus === 'moving_r2' ? '#00B894' : 'var(--border-color)', position: 'relative' }}>
                {packetStatus === 'moving_r2' && (
                  <div style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#00B894',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '99px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }} className="animate-bounce-soft">
                    📦 Packet #1
                  </div>
                )}
              </div>

              {/* Node 3: Web Server */}
              <div style={{ textAlign: 'center', width: '130px' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '20px',
                  background: packetStatus === 'delivered' ? 'linear-gradient(135deg, #00B894, #00CEC9)' : 'linear-gradient(135deg, #FF7675, #D63031)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                  boxShadow: '0 8px 16px rgba(255, 118, 117, 0.4)',
                  transition: 'background 0.3s ease'
                }}>
                  <Server size={36} />
                </div>
                <h4 style={{ margin: 0 }}>Web Server</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IP: 142.250.190.46</span>
              </div>

            </div>

            {/* Controls */}
            <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <input 
                type="text"
                value={packetMessage}
                onChange={(e) => setPacketMessage(e.target.value)}
                placeholder="Type payload message..."
                style={{
                  padding: '12px 20px',
                  borderRadius: '99px',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  width: '280px'
                }}
              />

              <button 
                onClick={handleSendPacket}
                disabled={packetStatus === 'moving_r1' || packetStatus === 'moving_r2'}
                className="btn-primary"
                style={{ opacity: (packetStatus === 'moving_r1' || packetStatus === 'moving_r2') ? 0.6 : 1 }}
              >
                <Send size={18} /> Dispatch Packet Now
              </button>
            </div>

            {/* Network Packet Console Logs */}
            {logs.length > 0 && (
              <div style={{
                marginTop: '24px',
                background: '#1E1E2E',
                color: '#A6E3A1',
                fontFamily: 'var(--font-code)',
                fontSize: '0.85rem',
                padding: '16px 20px',
                borderRadius: '16px',
                textAlign: 'left'
              }}>
                {logs.map((log, idx) => (
                  <div key={idx} style={{ marginBottom: '4px' }}>{log}</div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Vocabulary Flashcards */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="var(--primary)" /> Interactive Vocabulary Flashcards
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Click any card to flip and reveal its beginner-friendly definition!</p>

          <div className="grid-cols-auto">
            
            {[
              { id: 'card1', term: 'IP Address', definition: 'The unique digital home address of every device connected to the Internet! Example: 192.168.1.1' },
              { id: 'card2', term: 'Packet', definition: 'A small piece of a larger message or video file sent across the network with source and destination addresses.' },
              { id: 'card3', term: 'Router', definition: 'A smart networking device that directs packets along the fastest pathways to reach their destination.' }
            ].map(card => (
              <div 
                key={card.id}
                onClick={() => toggleCard(card.id)}
                className="interactive-card glass-card"
                style={{
                  padding: '32px',
                  minHeight: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  background: flippedCards[card.id] ? 'linear-gradient(135deg, #6C5CE7, #8C7AE6)' : 'var(--bg-card)',
                  color: flippedCards[card.id] ? 'white' : 'var(--text-main)',
                  transition: 'transform 0.4s ease, background 0.3s ease'
                }}
              >
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.8, marginBottom: '8px', letterSpacing: '1px' }}>
                  {flippedCards[card.id] ? 'DEFINITION' : 'TERM (CLICK TO FLIP)'}
                </span>
                <h4 style={{ fontSize: '1.4rem', margin: 0 }}>
                  {flippedCards[card.id] ? card.definition : card.term}
                </h4>
              </div>
            ))}

          </div>
        </div>

        {/* Java Code Snippet Preview (Connecting Theory to Java) */}
        <div className="glass-card" style={{ padding: '32px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <FileCode size={24} color="var(--primary)" />
            <h3 style={{ fontSize: '1.4rem', margin: 0 }}>How Java Sends Network Packets ☕</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
            In Java programming, engineers use classes like <code>Socket</code> and <code>InetAddress</code> to communicate over the Internet:
          </p>

          <div className="code-box">
            <span className="code-comment">// Java code to connect to a web server IP address</span><br/>
            <span className="code-keyword">import</span> java.net.Socket;<br/><br/>
            <span className="code-keyword">public class</span> <span className="code-type">NetworkPacketDemo</span> &#123;<br/>
            &nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) throws Exception &#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">Socket</span> socket = <span className="code-keyword">new</span> <span className="code-type">Socket</span>(<span className="code-string">"142.250.190.46"</span>, 80);<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(<span className="code-string">"Connected to server successfully! 🚀"</span>);<br/>
            &nbsp;&nbsp;&#125;<br/>
            &#125;
          </div>
        </div>

        {/* Bottom CTA to Quiz */}
        <div className="glass-card" style={{
          padding: '36px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #00B894 0%, #00CEC9 100%)',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Ready to test your knowledge? 🎯</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: '24px' }}>
            Complete the 5-question interactive quiz to earn 100 XP and unlock Step 5!
          </p>
          <Link to={`/quiz/${topicId}`} className="btn-primary" style={{ background: 'white', color: '#00B894', fontSize: '1.2rem', padding: '14px 36px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
            <Play size={20} fill="#00B894" /> Start Topic Quiz Now
          </Link>
        </div>

      </div>
    </div>
  );
};
