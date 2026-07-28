import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import { Shield, Plus, Edit, Trash2, Users, BookOpen, HelpCircle, CheckCircle2, Lock, Unlock, Search } from 'lucide-react';

export const AdminPage = () => {
  const { user } = useAuth();
  const { topics } = useGamification();
  const [activeTab, setActiveTab] = useState('lessons'); // lessons | quizzes | students

  const mockStudents = [
    { id: 1, name: "Aru", email: "aru@learnstep.edu", xp: 350, level: 2, completed: 2, streak: 4 },
    { id: 2, name: "Alex Chen", email: "alex@school.edu", xp: 620, level: 4, completed: 5, streak: 7 },
    { id: 3, name: "Maya Patel", email: "maya@school.edu", xp: 180, level: 1, completed: 1, streak: 2 }
  ];

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        
        {/* Header */}
        <div className="glass-card" style={{
          padding: '32px',
          marginBottom: '32px',
          background: 'linear-gradient(135deg, rgba(255, 118, 117, 0.15) 0%, rgba(108, 92, 231, 0.1) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FF7675', fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700 }}>
              <Shield size={16} /> ADMIN MANAGEMENT PORTAL
            </span>
            <h1 style={{ fontSize: '2.2rem', margin: '4px 0 8px' }}>Course & Content Management</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Create lessons, configure quizzes, inspect student learning analytics, and manage topic unlocks.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary" style={{ background: '#FF7675', fontSize: '0.95rem' }}>
              <Plus size={18} /> Add New Lesson Module
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
          <button
            onClick={() => setActiveTab('lessons')}
            style={{
              padding: '10px 24px',
              borderRadius: '99px',
              border: 'none',
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              cursor: 'pointer',
              background: activeTab === 'lessons' ? 'var(--primary)' : 'var(--bg-card)',
              color: activeTab === 'lessons' ? 'white' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <BookOpen size={18} /> Topic Lessons ({topics.length})
          </button>

          <button
            onClick={() => setActiveTab('quizzes')}
            style={{
              padding: '10px 24px',
              borderRadius: '99px',
              border: 'none',
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              cursor: 'pointer',
              background: activeTab === 'quizzes' ? 'var(--primary)' : 'var(--bg-card)',
              color: activeTab === 'quizzes' ? 'white' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <HelpCircle size={18} /> Quiz Question Bank
          </button>

          <button
            onClick={() => setActiveTab('students')}
            style={{
              padding: '10px 24px',
              borderRadius: '99px',
              border: 'none',
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              cursor: 'pointer',
              background: activeTab === 'students' ? 'var(--primary)' : 'var(--bg-card)',
              color: activeTab === 'students' ? 'white' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Users size={18} /> Student Roster ({mockStudents.length})
          </button>
        </div>

        {/* Tab 1: Lessons List */}
        {activeTab === 'lessons' && (
          <div className="glass-card" style={{ padding: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <th style={{ padding: '12px' }}>STEP #</th>
                  <th style={{ padding: '12px' }}>TITLE</th>
                  <th style={{ padding: '12px' }}>STATUS</th>
                  <th style={{ padding: '12px' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {topics.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 12px', fontWeight: 700 }}>{t.id}</td>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
                        <div>
                          <strong>{t.title}</strong>
                          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.description}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '99px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        background: t.isUnlocked ? 'rgba(0, 184, 148, 0.15)' : 'rgba(255, 118, 117, 0.15)',
                        color: t.isUnlocked ? '#00B894' : '#D63031'
                      }}>
                        {t.isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}>
                          <Edit size={18} />
                        </button>
                        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#FF7675' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Students Roster */}
        {activeTab === 'students' && (
          <div className="glass-card" style={{ padding: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <th style={{ padding: '12px' }}>STUDENT</th>
                  <th style={{ padding: '12px' }}>EMAIL</th>
                  <th style={{ padding: '12px' }}>XP</th>
                  <th style={{ padding: '12px' }}>LEVEL</th>
                  <th style={{ padding: '12px' }}>STREAK</th>
                </tr>
              </thead>
              <tbody>
                {mockStudents.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 12px', fontWeight: 700 }}>🤖 {s.name}</td>
                    <td style={{ padding: '16px 12px', color: 'var(--text-muted)' }}>{s.email}</td>
                    <td style={{ padding: '16px 12px', fontWeight: 800, color: 'var(--primary)' }}>{s.xp} XP</td>
                    <td style={{ padding: '16px 12px' }}>Level {s.level}</td>
                    <td style={{ padding: '16px 12px', color: '#D63031', fontWeight: 700 }}>🔥 {s.streak} Days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};
