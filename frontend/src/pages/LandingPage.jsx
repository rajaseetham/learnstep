import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Map, BookOpen, Award, ArrowRight, Zap, Play, CheckCircle2, Shield, Bot } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

export const LandingPage = () => {
  const { xp, streak, level } = useGamification();
  const [binaryVal, setBinaryVal] = useState([1, 0, 1, 0]); // 10 decimal

  const toggleBit = (idx) => {
    setBinaryVal(prev => prev.map((bit, i) => i === idx ? (bit === 1 ? 0 : 1) : bit));
  };

  const decimalVal = binaryVal.reduce((acc, bit, idx) => acc + bit * Math.pow(2, 3 - idx), 0);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        padding: '80px 0 60px',
        textAlign: 'center',
        background: 'radial-gradient(circle at 50% 20%, rgba(108, 92, 231, 0.15) 0%, transparent 60%)'
      }}>
        <div className="container">
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(108, 92, 231, 0.1)',
            color: 'var(--primary)',
            padding: '8px 20px',
            borderRadius: '99px',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.95rem',
            marginBottom: '24px'
          }}>
            <Sparkles size={18} />
            <span>The Digital CS Textbook That Comes Alive</span>
          </div>

          <h1 style={{
            fontSize: '3.5rem',
            lineHeight: '1.15',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, var(--text-main) 30%, var(--primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Learn Computer Science <br /> Step by Step, Fun by Fun!
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-muted)',
            maxWidth: '720px',
            margin: '0 auto 36px',
            lineHeight: '1.6'
          }}>
            No boring textbooks! Explore binary switches, route live Internet packets, write your first Java code, and earn XP badges as you journey from beginner to AI wizard.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/roadmap" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1.2rem', padding: '16px 36px' }}>
              <Play size={22} fill="white" /> Start Learning Free
            </Link>

            <Link to="/lesson/4" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '1.1rem', padding: '14px 30px' }}>
              <Zap size={20} /> Try Router Simulator
            </Link>
          </div>

          {/* Interactive Binary Sandbox Demo */}
          <div className="glass-card" style={{
            maxWidth: '680px',
            margin: '60px auto 0',
            padding: '28px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.4rem' }}>💡</span>
              <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Interactive Binary Switcher</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
              Click the switches below to flip bits between 0 and 1:
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
              {binaryVal.map((bit, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    2<sup>{3 - idx}</sup> = {Math.pow(2, 3 - idx)}
                  </span>
                  <button
                    onClick={() => toggleBit(idx)}
                    style={{
                      width: '64px',
                      height: '72px',
                      borderRadius: '16px',
                      border: bit === 1 ? '3px solid #00B894' : '3px solid var(--border-color)',
                      background: bit === 1 ? 'linear-gradient(135deg, #00B894, #00CEC9)' : 'var(--bg-main)',
                      color: bit === 1 ? 'white' : 'var(--text-muted)',
                      fontSize: '2rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: bit === 1 ? '0 8px 20px rgba(0, 184, 148, 0.4)' : 'none',
                      transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    {bit}
                  </button>
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(108, 92, 231, 0.1)',
              padding: '12px 20px',
              borderRadius: '99px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Decimal Output:</span>
              <span style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                color: 'var(--primary)'
              }}>
                {decimalVal}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section style={{ padding: '60px 0', background: 'var(--bg-card)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>Why Students Love LearnStep ❤️</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Designed to spark curiosity and reward understanding.</p>
          </div>

          <div className="grid-cols-auto">
            <div className="interactive-card glass-card" style={{ padding: '32px' }}>
              <div style={{ background: 'rgba(108, 92, 231, 0.1)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Map size={30} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Structured Roadmap</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Learn topics in natural logical order. Unlock the next module only when you feel confident with the basics.
              </p>
            </div>

            <div className="interactive-card glass-card" style={{ padding: '32px' }}>
              <div style={{ background: 'rgba(0, 184, 148, 0.1)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Zap size={30} color="var(--secondary)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Interactive Visualizers</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Click routers, drag memory blocks, and watch data packets move in real-time right inside your browser.
              </p>
            </div>

            <div className="interactive-card glass-card" style={{ padding: '32px' }}>
              <div style={{ background: 'rgba(253, 203, 110, 0.2)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Award size={30} color="#D63031" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>XP, Streaks & Badges</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Earn XP points for every completed activity. Collect streak flames and unlock digital certificates!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
