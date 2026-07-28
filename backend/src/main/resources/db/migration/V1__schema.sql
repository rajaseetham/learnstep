-- LearnStep - MySQL Database Schema (V1)
-- Gamified Computer Science Learning Platform

CREATE DATABASE IF NOT EXISTS `learnstep_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `learnstep_db`;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) DEFAULT '🤖',
    `xp` INT DEFAULT 0,
    `level` INT DEFAULT 1,
    `streak_count` INT DEFAULT 1,
    `last_active_date` DATE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Roles Table
CREATE TABLE IF NOT EXISTS `roles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(20) NOT NULL UNIQUE
) ENGINE=InnoDB;

INSERT INTO `roles` (`name`) VALUES ('ROLE_STUDENT'), ('ROLE_ADMIN')
ON DUPLICATE KEY UPDATE `name`=`name`;

-- 3. User Roles Junction Table
CREATE TABLE IF NOT EXISTS `user_roles` (
    `user_id` BIGINT NOT NULL,
    `role_id` INT NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Topics Table (Roadmap Steps 1 to 12)
CREATE TABLE IF NOT EXISTS `topics` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(100) NOT NULL,
    `icon` VARCHAR(10),
    `description` TEXT,
    `step_number` INT NOT NULL UNIQUE,
    `level_required` INT DEFAULT 1
) ENGINE=InnoDB;

-- Initial Roadmap Seed Data
INSERT INTO `topics` (`step_number`, `title`, `icon`, `description`, `level_required`) VALUES
(1, 'Computer Basics', '💻', 'What is a computer & its main hardware components?', 1),
(2, 'How Computers Work', '🧠', 'CPU, RAM, Storage & Binary 0s and 1s', 1),
(3, 'Operating Systems', '⚙️', 'Windows, macOS, Linux & File System management', 1),
(4, 'How the Internet Works', '🌐', 'IP Addresses, Packets, Routers & Web Servers', 2),
(5, 'Programming Logic', '🧩', 'Variables, If/Else Decisions & Loops', 3),
(6, 'Java Programming', '☕', 'Java Syntax, Methods, System.out & Input', 4),
(7, 'Object-Oriented Programming', '📦', 'Classes, Objects, Inheritance & Encapsulation', 5),
(8, 'Data Structures', '📊', 'Arrays, ArrayLists, Stacks & Queues', 6),
(9, 'Databases', '🗄️', 'MySQL, Tables, SELECT Queries & Foreign Keys', 7),
(10, 'Web Development', '🎨', 'HTML5 tags, CSS flexbox & Javascript interactive web', 8),
(11, 'Cloud Computing', '☁️', 'AWS EC2, S3 Storage & Cloud Servers', 9),
(12, 'Artificial Intelligence', '🤖', 'Neural networks, Machine Learning & ChatGPT prompts', 10);

-- 5. Lessons Table
CREATE TABLE IF NOT EXISTS `lessons` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `topic_id` INT NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `explanation` LONGTEXT NOT NULL,
    `real_life_analogy` TEXT,
    `java_code_snippet` TEXT,
    `xp_reward` INT DEFAULT 50,
    FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Quizzes & Questions
CREATE TABLE IF NOT EXISTS `quizzes` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `topic_id` INT NOT NULL UNIQUE,
    `title` VARCHAR(150) NOT NULL,
    `total_questions` INT DEFAULT 5,
    FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `questions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `quiz_id` BIGINT NOT NULL,
    `question_text` TEXT NOT NULL,
    `question_type` VARCHAR(20) NOT NULL, -- MCQ, TRUE_FALSE, FILL_BLANK, MATCH
    `options_json` JSON,
    `correct_answer` VARCHAR(255) NOT NULL,
    `explanation` TEXT,
    FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. Student Progress & Achievements
CREATE TABLE IF NOT EXISTS `student_progress` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `topic_id` INT NOT NULL,
    `is_completed` BOOLEAN DEFAULT FALSE,
    `completed_at` TIMESTAMP NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `user_topic_unique` (`user_id`, `topic_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `badges` (
    `id` VARCHAR(50) PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `icon` VARCHAR(10) NOT NULL,
    `description` VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `user_badges` (
    `user_id` BIGINT NOT NULL,
    `badge_id` VARCHAR(50) NOT NULL,
    `unlocked_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`, `badge_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`badge_id`) REFERENCES `badges`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
