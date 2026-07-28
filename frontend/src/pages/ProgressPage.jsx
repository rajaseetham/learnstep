import React, { useState } from 'react';
import { useGamification } from '../context/GamificationContext';
import { useAuth } from '../context/AuthContext';
import { Award, Flame, Sparkles, Trophy, Download, Printer, CheckCircle2, Star } from 'lucide-react';

export const ProgressPage = () => {
  const { user } = useAuth();
  const { xp, level, streak, badges, topics } = useGamification();
  const [showCertificate, setShowCertificate] = useState(false);

  const completedCount = topics.filter(t => t.isCompleted).length;

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="xp-tag" style={{ marginBottom: '12px' }}>
            <Award size={16} fill="#FDCB6E" /> YOUR ACHIEVEMENTS & PROGRESS
          </span>
          <h1 style={{ fontSize: '2.5rem', margin: '8px 0' }}>Learning Trophies & Badges</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Track your streak, view earned badges, and claim your Computer Science certificates!
          </p>
        </div>

        {/* Top Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          
          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(108, 92, 231, 0.1)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Sparkles size={28} color="var(--primary)" fill="#A29BFE" />
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL XP EARNED</span>
            <h2 style={{ fontSize: '2.2rem', margin: '4px 0', color: 'var(--primary)' }}>{xp} XP</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Level {level} Explorer</span>
          </div>

          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(255, 118, 117, 0.15)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Flame size={28} color="#D63031" fill="#FF7675" />
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>DAILY STREAK</span>
            <h2 style={{ fontSize: '2.2rem', margin: '4px 0', color: '#D63031' }}>{streak} Days</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Keep learning daily!</span>
          </div>

          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(0, 184, 148, 0.15)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <CheckCircle2 size={28} color="#00B894" />
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>MODULES COMPLETED</span>
            <h2 style={{ fontSize: '2.2rem', margin: '4px 0', color: '#00B894' }}>{completedCount} / 12</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{Math.round((completedCount/12)*100)}% Mastery</span>
          </div>

        </div>

        {/* Badges Grid */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Badges Collection</h2>
          <div className="grid-cols-auto">
            {badges.map(badge => (
              <div 
                key={badge.id}
                className="glass-card interactive-card"
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  opacity: badge.earned ? 1 : 0.5,
                  border: badge.earned ? '2px solid #FDCB6E' : '1px solid var(--border-color)',
                  background: badge.earned ? 'linear-gradient(135deg, rgba(253, 203, 110, 0.15) 0%, rgba(255, 234, 167, 0.2) 100%)' : 'var(--bg-card)'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{badge.icon}</div>
                <h3 style={{ fontSize: '1.2rem', margin: '4px 0' }}>{badge.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{badge.description}</p>
                <span style={{
                  display: 'inline-block',
                  marginTop: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: badge.earned ? '#D63031' : 'var(--text-muted)',
                  background: badge.earned ? '#FFEAA7' : 'var(--bg-main)',
                  padding: '4px 12px',
                  borderRadius: '99px'
                }}>
                  {badge.earned ? 'UNLOCKED 🏆' : 'LOCKED 🔒'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Section */}
        <div className="glass-card" style={{ padding: '36px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Computer Science Certificate 📜</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Generated automatically as you complete Computer Science modules!
          </p>

          <button 
            onClick={() => setShowCertificate(prev => !prev)}
            className="btn-primary"
            style={{ fontSize: '1.1rem', padding: '12px 32px' }}
          >
            <Trophy size={20} /> {showCertificate ? 'Hide Certificate' : 'View Printable Certificate'}
          </button>

          {/* Printable Certificate Modal/View */}
          {showCertificate && (
            <div style={{
              marginTop: '36px',
              padding: '48px',
              background: '#FFFDF5',
              border: '12px double #6C5CE7',
              borderRadius: '24px',
              color: '#2D3436',
              boxShadow: 'var(--shadow-md)',
              maxWidth: '800px',
              margin: '36px auto 0'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '8px' }}>⚡</div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#6C5CE7', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Certificate of Achievement
              </h1>
              <p style={{ fontSize: '1rem', color: '#636E72', margin: '8px 0 24px' }}>
                LEARNSTEP GAMIFIED COMPUTER SCIENCE PLATFORM
              </p>
              <p style={{ fontSize: '1.2rem' }}>This certifies that</p>
              <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-heading)', color: '#00B894', margin: '12px 0' }}>
                {user?.username || "Aru"}
              </h2>
              <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 28px', lineHeight: '1.6' }}>
                has successfully demonstrated understanding in <strong>Computer Basics, Binary Logic, Networking, and Java Principles</strong> on LearnStep.
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '2px dashed #CBD5E1' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', color: '#636E72', display: 'block' }}>DATE ISSUED</span>
                  <strong>{new Date().toLocaleDateString()}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: '#636E72', display: 'block' }}>TOTAL XP</span>
                  <strong style={{ color: '#6C5CE7' }}>{xp} XP</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: '#636E72', display: 'block' }}>VERIFIED SEAL</span>
                  <span style={{ color: '#00B894', fontWeight: 800 }}>✓ OFFICIAL</span>
                </div>
              </div>

              <div style={{ marginTop: '28px' }}>
                <button 
                  onClick={handlePrintCertificate}
                  className="btn-secondary"
                  style={{ fontSize: '0.95rem', padding: '10px 24px' }}
                >
                  <Printer size={18} /> Print / Save PDF
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
