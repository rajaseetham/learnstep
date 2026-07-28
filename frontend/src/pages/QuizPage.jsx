import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGamification } from '../context/GamificationContext';
import { CheckCircle2, XCircle, Award, Sparkles, ArrowRight, RotateCcw, HelpCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_QUIZZES = {
  4: [
    {
      id: 1,
      type: 'mcq',
      question: 'What is a tiny chunk of data sent across the Internet called?',
      options: ['Packet', 'Byte-Box', 'Router-Baguette', 'Ethernet-Cookie'],
      correctAnswer: 0,
      explanation: 'Data is broken into tiny units called Packets before being sent over network wires!'
    },
    {
      id: 2,
      type: 'tf',
      question: 'True or False: Every device on the Internet has a unique IP Address.',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'True! An IP address works just like your home mailing address so data knows where to go.'
    },
    {
      id: 3,
      type: 'fill',
      question: 'Fill in the blank: The main job of a ________ is to direct packets along the fastest pathways.',
      answer: 'router',
      explanation: 'A Router reads IP addresses on packets and forwards them to the next network hop!'
    },
    {
      id: 4,
      type: 'match',
      question: 'Match the term to its correct definition:',
      options: ['Client', 'Server'],
      matches: ['Requests web pages (e.g. your phone/laptop)', 'Stores and serves web pages (e.g. Google)'],
      correctAnswer: [0, 1],
      explanation: 'Clients make requests, while Servers host data and respond!'
    },
    {
      id: 5,
      type: 'mcq',
      question: 'Which Java class can be used to open a network connection to a server?',
      options: ['Socket', 'FileStream', 'Scanner', 'SystemOut'],
      correctAnswer: 0,
      explanation: 'The Socket class in java.net is used to open network connections!'
    }
  ]
};

export const QuizPage = () => {
  const { id } = useParams();
  const topicId = parseInt(id, 10) || 4;
  const navigate = useNavigate();
  const { addXp, completeTopic, unlockBadge } = useGamification();

  const questions = SAMPLE_QUIZZES[topicId] || SAMPLE_QUIZZES[4];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [fillVal, setFillVal] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
  };

  const handleCheckAnswer = () => {
    if (isAnswered) return;

    let isCorrect = false;
    if (currentQ.type === 'mcq' || currentQ.type === 'tf' || currentQ.type === 'match') {
      if (selectedOpt === currentQ.correctAnswer) isCorrect = true;
    } else if (currentQ.type === 'fill') {
      if (fillVal.trim().toLowerCase() === currentQ.answer.toLowerCase()) isCorrect = true;
    }

    if (isCorrect) setScore(prev => prev + 1);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setFillVal('');
      setIsAnswered(false);
    } else {
      // Quiz Finished!
      setIsQuizCompleted(true);
      const xpEarned = 100 + (score === questions.length ? 50 : 0);
      addXp(xpEarned, "Quiz Completed");
      completeTopic(topicId);
      if (score === questions.length) unlockBadge('quiz_ace');

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        
        {!isQuizCompleted ? (
          <div className="glass-card" style={{ padding: '36px' }}>
            
            {/* Header / Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span className="xp-tag">
                <Sparkles size={16} fill="#FDCB6E" /> QUESTION {currentIdx + 1} OF {questions.length}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Score: {score} / {questions.length}
              </span>
            </div>

            <div style={{
              height: '8px',
              background: 'var(--bg-main)',
              borderRadius: '99px',
              overflow: 'hidden',
              marginBottom: '32px'
            }}>
              <div style={{
                width: `${((currentIdx + 1) / questions.length) * 100}%`,
                height: '100%',
                background: 'var(--primary)',
                transition: 'width 0.3s ease'
              }} />
            </div>

            {/* Question Text */}
            <h2 style={{ fontSize: '1.6rem', marginBottom: '24px', lineHeight: '1.4' }}>
              {currentQ.question}
            </h2>

            {/* MCQ / TF Options */}
            {(currentQ.type === 'mcq' || currentQ.type === 'tf') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {currentQ.options.map((opt, idx) => {
                  let bgColor = 'var(--bg-card)';
                  let borderColor = 'var(--border-color)';
                  let textColor = 'var(--text-main)';

                  if (selectedOpt === idx) {
                    bgColor = 'rgba(108, 92, 231, 0.15)';
                    borderColor = 'var(--primary)';
                  }

                  if (isAnswered) {
                    if (idx === currentQ.correctAnswer) {
                      bgColor = 'rgba(0, 184, 148, 0.2)';
                      borderColor = '#00B894';
                      textColor = '#00B894';
                    } else if (selectedOpt === idx) {
                      bgColor = 'rgba(255, 118, 117, 0.2)';
                      borderColor = '#FF7675';
                      textColor = '#D63031';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      style={{
                        padding: '16px 24px',
                        borderRadius: '16px',
                        border: `2px solid ${borderColor}`,
                        background: bgColor,
                        color: textColor,
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.1rem',
                        textAlign: 'left',
                        cursor: isAnswered ? 'default' : 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === currentQ.correctAnswer && <CheckCircle2 size={20} color="#00B894" />}
                      {isAnswered && selectedOpt === idx && idx !== currentQ.correctAnswer && <XCircle size={20} color="#D63031" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Fill-in-the-Blank Input */}
            {currentQ.type === 'fill' && (
              <div style={{ marginBottom: '28px' }}>
                <input
                  type="text"
                  value={fillVal}
                  onChange={(e) => setFillVal(e.target.value)}
                  disabled={isAnswered}
                  placeholder="Type your answer here..."
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    borderRadius: '16px',
                    border: '2px solid var(--primary)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    outline: 'none',
                    background: 'var(--bg-main)'
                  }}
                />
              </div>
            )}

            {/* Explanation Drawer after Answered */}
            {isAnswered && (
              <div style={{
                padding: '20px',
                borderRadius: '16px',
                background: selectedOpt === currentQ.correctAnswer || (currentQ.type === 'fill' && fillVal.trim().toLowerCase() === currentQ.answer)
                  ? 'rgba(0, 184, 148, 0.15)'
                  : 'rgba(255, 118, 117, 0.15)',
                border: '1px solid var(--border-color)',
                marginBottom: '28px'
              }}>
                <h4 style={{
                  margin: '0 0 6px 0',
                  color: selectedOpt === currentQ.correctAnswer || (currentQ.type === 'fill' && fillVal.trim().toLowerCase() === currentQ.answer)
                    ? '#00B894'
                    : '#D63031',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <HelpCircle size={18} /> Explanation:
                </h4>
                <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', margin: 0 }}>
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {!isAnswered ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedOpt === null && !fillVal.trim()}
                  className="btn-primary"
                  style={{ opacity: (selectedOpt === null && !fillVal.trim()) ? 0.5 : 1 }}
                >
                  Check Answer
                </button>
              ) : (
                <button onClick={handleNextQuestion} className="btn-secondary">
                  <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Quiz Results Celebration Modal */
          <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
            <div style={{
              width: '96px',
              height: '96px',
              borderRadius: '32px',
              background: 'linear-gradient(135deg, #FFEAA7, #FDCB6E)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 10px 25px rgba(253, 203, 110, 0.5)'
            }}>
              <Trophy size={54} color="#D63031" />
            </div>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Quiz Completed! 🎉</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '24px' }}>
              You scored {score} out of {questions.length} questions correctly!
            </p>

            <div style={{
              display: 'inline-flex',
              gap: '16px',
              background: 'var(--bg-main)',
              padding: '16px 28px',
              borderRadius: '99px',
              marginBottom: '36px'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>XP EARNED</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#00B894' }}>+{100 + (score === questions.length ? 50 : 0)} XP</span>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '16px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>NEXT STEP UNLOCKED</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>Step 5 🔓</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <Link to="/roadmap" className="btn-primary" style={{ textDecoration: 'none', padding: '14px 32px' }}>
                Continue on Roadmap
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
