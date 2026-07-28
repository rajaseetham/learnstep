import React from 'react';
import { Heart, Sparkles, Code2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      padding: '32px 0',
      marginTop: '60px',
      background: 'var(--bg-card)',
      textAlign: 'center'
    }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>⚡ LearnStep</span>
          <span style={{ color: 'var(--text-muted)' }}>— Digital Textbook Comes Alive</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Designed for students & beginners to master Computer Science from basics to advanced.
        </p>
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Crafted with</span>
          <Heart size={16} fill="#FF7675" color="#FF7675" />
          <span>using React & Spring Boot</span>
        </div>
      </div>
    </footer>
  );
};
