import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Flame, Moon, Sun, User, Shield, LogOut, BookOpen, Map, Award, Bot, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, switchRole } = useAuth();
  const { xp, level, streak } = useGamification();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
      padding: '12px 24px'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(108, 92, 231, 0.4)'
          }}>
            <span style={{ fontSize: '24px' }}>⚡</span>
          </div>
          <div>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, #6C5CE7 0%, #00B894 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              LearnStep
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              CS Textbook Alive
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/roadmap" style={{
            textDecoration: 'none',
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem',
            color: isActive('/roadmap') ? 'var(--primary)' : 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '12px',
            background: isActive('/roadmap') ? 'rgba(108, 92, 231, 0.1)' : 'transparent',
            transition: 'all 0.2s ease'
          }}>
            <Map size={18} /> Roadmap
          </Link>

          <Link to="/lesson/4" style={{
            textDecoration: 'none',
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem',
            color: isActive('/lesson/4') ? 'var(--primary)' : 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '12px',
            background: isActive('/lesson/4') ? 'rgba(108, 92, 231, 0.1)' : 'transparent',
            transition: 'all 0.2s ease'
          }}>
            <BookOpen size={18} /> Live Textbook
          </Link>

          <Link to="/progress" style={{
            textDecoration: 'none',
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem',
            color: isActive('/progress') ? 'var(--primary)' : 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '12px',
            background: isActive('/progress') ? 'rgba(108, 92, 231, 0.1)' : 'transparent',
            transition: 'all 0.2s ease'
          }}>
            <Award size={18} /> Badges & XP
          </Link>

          {user?.role === 'ROLE_ADMIN' && (
            <Link to="/admin" style={{
              textDecoration: 'none',
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              color: '#FF7675',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '12px',
              background: 'rgba(255, 118, 117, 0.1)',
              transition: 'all 0.2s ease'
            }}>
              <Shield size={18} /> Admin Portal
            </Link>
          )}
        </div>

        {/* Status Indicators & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* XP Pill */}
          <div className="xp-tag" title="Your Experience Points">
            <Sparkles size={16} fill="#FDCB6E" />
            <span>{xp} XP</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.8, paddingLeft: '4px' }}>Lvl {level}</span>
          </div>

          {/* Streak Pill */}
          <div style={{
            background: 'linear-gradient(135deg, #FF7675 0%, #D63031 100%)',
            color: 'white',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.9rem',
            padding: '6px 12px',
            borderRadius: '99px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 10px rgba(214, 48, 49, 0.3)'
          }} title="Daily Learning Streak">
            <Flame size={18} fill="#FFEAA7" />
            <span>{streak} Days</span>
          </div>

          {/* Role Switcher Button */}
          <button 
            onClick={() => switchRole(user?.role === 'ROLE_ADMIN' ? 'ROLE_STUDENT' : 'ROLE_ADMIN')}
            title="Click to toggle between Student & Admin roles"
            style={{
              background: user?.role === 'ROLE_ADMIN' ? '#FF7675' : 'var(--primary-light)',
              color: 'white',
              border: 'none',
              borderRadius: '99px',
              padding: '6px 14px',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {user?.role === 'ROLE_ADMIN' ? <Shield size={14} /> : <User size={14} />}
            <span>{user?.role === 'ROLE_ADMIN' ? 'Admin Mode' : 'Student Mode'}</span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            {isDark ? <Sun size={20} color="#FDCB6E" /> : <Moon size={20} color="#6C5CE7" />}
          </button>

          {/* Logout / User */}
          <button 
            onClick={logout}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.85rem'
            }}
            title="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};
