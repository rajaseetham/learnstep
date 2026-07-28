import React from 'react';
import { Link } from 'react-router-dom';
import { useGamification } from '../context/GamificationContext';
import { CheckCircle2, Lock, Play, Sparkles, Star, Award, Bookmark } from 'lucide-react';

export const RoadmapPage = () => {
  const { topics, xp, level, xpForCurrentLevel, progressPercent, bookmarks, toggleBookmark } = useGamification();

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        
        {/* Header Banner */}
        <div className="glass-card" style={{
          padding: '32px',
          marginBottom: '40px',
          background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.15) 0%, rgba(0, 184, 148, 0.1) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--primary)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9rem',
              fontWeight: 700
            }}>
              <Sparkles size={16} /> YOUR LEARNING ROADMAP
            </span>
            <h1 style={{ fontSize: '2.2rem', margin: '6px 0 10px' }}>Computer Science Journey</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px' }}>
              Master foundational topics step-by-step. Each module unlocks as you complete the previous topic quiz!
            </p>
          </div>

          {/* Level & XP Progress Card */}
          <div style={{
            background: 'var(--bg-card)',
            padding: '20px 28px',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-sm)',
            minWidth: '280px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>
                Level {level} Explorer
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {xpForCurrentLevel} / 200 XP
              </span>
            </div>
            
            {/* Progress Bar Container */}
            <div style={{
              height: '14px',
              background: 'var(--bg-main)',
              borderRadius: '99px',
              overflow: 'hidden',
              padding: '2px'
            }}>
              <div style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #6C5CE7 0%, #00B894 100%)',
                borderRadius: '99px',
                transition: 'width 0.5s ease'
              }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px', textAlign: 'right' }}>
              Total: {xp} XP
            </span>
          </div>
        </div>

        {/* Roadmap Nodes List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '860px', margin: '0 auto' }}>
          {topics.map((topic, index) => {
            const isBookmarked = bookmarks.includes(topic.id);

            return (
              <div 
                key={topic.id}
                className="glass-card interactive-card"
                style={{
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  borderLeft: topic.isCompleted ? '6px solid #00B894' : topic.isUnlocked ? '6px solid #6C5CE7' : '6px solid #CBD5E1',
                  opacity: topic.isUnlocked ? 1 : 0.75
                }}
              >
                {/* Node Number & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    background: topic.isCompleted 
                      ? 'linear-gradient(135deg, #00B894, #00CEC9)' 
                      : topic.isUnlocked 
                      ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' 
                      : 'var(--bg-main)',
                    color: topic.isUnlocked ? 'white' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    boxShadow: topic.isUnlocked ? '0 6px 16px rgba(108, 92, 231, 0.3)' : 'none',
                    position: 'relative'
                  }}>
                    {topic.icon}
                    {topic.isCompleted && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-4px',
                        right: '-4px',
                        background: 'white',
                        borderRadius: '50%',
                        display: 'flex'
                      }}>
                        <CheckCircle2 size={20} color="#00B894" fill="#00B894" color="white" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Step {topic.id}
                      </span>
                      {topic.isCompleted && (
                        <span style={{ background: 'rgba(0, 184, 148, 0.15)', color: '#00B894', fontSize: '0.75rem', fontWeight: 700, padding: '2px 10px', borderRadius: '99px' }}>
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: '1.4rem', margin: '4px 0' }}>{topic.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{topic.description}</p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  
                  {/* Bookmark Toggle */}
                  <button 
                    onClick={() => toggleBookmark(topic.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: isBookmarked ? '#FDCB6E' : 'var(--text-muted)',
                      padding: '8px'
                    }}
                    title={isBookmarked ? "Remove Bookmark" : "Bookmark Lesson"}
                  >
                    <Bookmark size={22} fill={isBookmarked ? "#FDCB6E" : "none"} />
                  </button>

                  {topic.isUnlocked ? (
                    <Link 
                      to={`/lesson/${topic.id}`} 
                      className={topic.isCompleted ? "btn-secondary" : "btn-primary"} 
                      style={{ textDecoration: 'none', padding: '10px 22px', fontSize: '0.95rem' }}
                    >
                      <Play size={16} fill="white" /> {topic.isCompleted ? "Review" : "Start"}
                    </Link>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'var(--bg-main)',
                      color: 'var(--text-muted)',
                      padding: '8px 18px',
                      borderRadius: '99px',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.85rem'
                    }}>
                      <Lock size={16} /> Complete Step {topic.id - 1}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
