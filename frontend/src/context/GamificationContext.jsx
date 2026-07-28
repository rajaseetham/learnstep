import React, { createContext, useState, useContext, useEffect } from 'react';
import confetti from 'canvas-confetti';

const GamificationContext = createContext();

const INITIAL_TOPICS = [
  { id: 1, title: "Computer Basics", icon: "💻", description: "What is a computer & its main parts?", levelRequired: 1, isUnlocked: true, isCompleted: true },
  { id: 2, title: "How Computers Work", icon: "🧠", description: "CPU, Memory, Binary numbers & 0s and 1s", levelRequired: 1, isUnlocked: true, isCompleted: true },
  { id: 3, title: "Operating Systems", icon: "⚙️", description: "Windows, macOS, Linux & Managing files", levelRequired: 1, isUnlocked: true, isCompleted: false },
  { id: 4, title: "How the Internet Works", icon: "🌐", description: "IP addresses, Routers, Packets & Web servers", levelRequired: 2, isUnlocked: false, isCompleted: false },
  { id: 5, title: "Programming Logic", icon: "🧩", description: "Variables, Loops, If/Else decisions", levelRequired: 3, isUnlocked: false, isCompleted: false },
  { id: 6, title: "Java Programming", icon: "☕", description: "Syntax, methods, printing & input", levelRequired: 4, isUnlocked: false, isCompleted: false },
  { id: 7, title: "Object-Oriented Programming", icon: "📦", description: "Classes, Objects, Inheritance & Polymorphism", levelRequired: 5, isUnlocked: false, isCompleted: false },
  { id: 8, title: "Data Structures", icon: "📊", description: "Arrays, Lists, Stacks, Queues & Trees", levelRequired: 6, isUnlocked: false, isCompleted: false },
  { id: 9, title: "Databases", icon: "🗄️", description: "Tables, SQL queries, Keys & Relations", levelRequired: 7, isUnlocked: false, isCompleted: false },
  { id: 10, title: "Web Development", icon: "🎨", description: "HTML tags, CSS styling & Javascript interactive pages", levelRequired: 8, isUnlocked: false, isCompleted: false },
  { id: 11, title: "Cloud Computing", icon: "☁️", description: "Servers, Cloud storage, EC2 & S3", levelRequired: 9, isUnlocked: false, isCompleted: false },
  { id: 12, title: "Artificial Intelligence", icon: "🤖", description: "Machine learning, Neural networks & ChatGPT", levelRequired: 10, isUnlocked: false, isCompleted: false },
];

const ALL_BADGES = [
  { id: 'first_step', name: 'First Step', icon: '🐣', description: 'Completed your first lesson!', earned: true },
  { id: 'binary_wiz', name: 'Binary Wizard', icon: '🔮', description: 'Mastered 0s and 1s in CPU lesson', earned: true },
  { id: 'packet_master', name: 'Packet Inspector', icon: '📬', description: 'Successfully routed 5 packets on the Internet', earned: false },
  { id: 'streak_master', name: 'Streak Flame', icon: '🔥', description: 'Maintained a 3-day learning streak', earned: true },
  { id: 'quiz_ace', name: 'Quiz Ace', icon: '🎯', description: 'Scored 100% on any topic quiz', earned: false },
  { id: 'java_ninja', name: 'Java Ninja', icon: '⚡', description: 'Wrote your first Java print statement', earned: false }
];

export const GamificationProvider = ({ children }) => {
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('learnstep_xp');
    return saved ? parseInt(saved, 10) : 350;
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('learnstep_streak');
    return saved ? parseInt(saved, 10) : 4;
  });

  const [topics, setTopics] = useState(() => {
    const saved = localStorage.getItem('learnstep_topics');
    return saved ? JSON.parse(saved) : INITIAL_TOPICS;
  });

  const [badges, setBadges] = useState(() => {
    const saved = localStorage.getItem('learnstep_badges');
    return saved ? JSON.parse(saved) : ALL_BADGES;
  });

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('learnstep_bookmarks');
    return saved ? JSON.parse(saved) : [1, 4];
  });

  // Calculate Level: Level 1 = 0-200 XP, Level 2 = 201-400 XP, etc.
  const level = Math.floor(xp / 200) + 1;
  const xpForCurrentLevel = xp % 200;
  const progressPercent = Math.min(100, Math.round((xpForCurrentLevel / 200) * 100));

  useEffect(() => {
    localStorage.setItem('learnstep_xp', xp.toString());
    localStorage.setItem('learnstep_streak', streak.toString());
    localStorage.setItem('learnstep_topics', JSON.stringify(topics));
    localStorage.setItem('learnstep_badges', JSON.stringify(badges));
    localStorage.setItem('learnstep_bookmarks', JSON.stringify(bookmarks));
  }, [xp, streak, topics, badges, bookmarks]);

  const addXp = (amount, reason = "Lesson completed") => {
    setXp(prev => {
      const nextXp = prev + amount;
      const oldLevel = Math.floor(prev / 200) + 1;
      const newLevel = Math.floor(nextXp / 200) + 1;
      
      // Trigger confetti animation on XP gain
      confetti({
        particleCount: newLevel > oldLevel ? 120 : 50,
        spread: 70,
        origin: { y: 0.6 }
      });

      return nextXp;
    });
  };

  const completeTopic = (topicId) => {
    setTopics(prev => {
      return prev.map(t => {
        if (t.id === topicId) {
          return { ...t, isCompleted: true };
        }
        // Unlock next topic automatically
        if (t.id === topicId + 1) {
          return { ...t, isUnlocked: true };
        }
        return t;
      });
    });
  };

  const unlockBadge = (badgeId) => {
    setBadges(prev => prev.map(b => b.id === badgeId ? { ...b, earned: true } : b));
  };

  const toggleBookmark = (topicId) => {
    setBookmarks(prev => 
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  return (
    <GamificationContext.Provider value={{
      xp,
      level,
      xpForCurrentLevel,
      progressPercent,
      streak,
      topics,
      badges,
      bookmarks,
      addXp,
      completeTopic,
      unlockBadge,
      toggleBookmark
    }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => useContext(GamificationContext);
