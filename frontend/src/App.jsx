import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GamificationProvider } from './context/GamificationContext';
import { ThemeProvider } from './context/ThemeContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { StepAITutor } from './components/ai/StepAITutor';

import { LandingPage } from './pages/LandingPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { LessonPage } from './pages/LessonPage';
import { QuizPage } from './pages/QuizPage';
import { ProgressPage } from './pages/ProgressPage';
import { AdminPage } from './pages/AdminPage';

import './styles/index.css';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GamificationProvider>
          <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/roadmap" element={<RoadmapPage />} />
                  <Route path="/lesson/:id" element={<LessonPage />} />
                  <Route path="/quiz/:id" element={<QuizPage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </main>
              <Footer />
              <StepAITutor />
            </div>
          </Router>
        </GamificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
