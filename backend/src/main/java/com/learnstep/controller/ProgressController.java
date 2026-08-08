package com.learnstep.controller;

import com.learnstep.entity.StudentProgress;
import com.learnstep.entity.Topic;
import com.learnstep.entity.User;
import com.learnstep.repository.StudentProgressRepository;
import com.learnstep.repository.TopicRepository;
import com.learnstep.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private StudentProgressRepository progressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TopicRepository topicRepository;

    @GetMapping("/user/{userId}")
    public List<StudentProgress> getUserProgress(@PathVariable Long userId) {
        return progressRepository.findByUserId(userId);
    }

    @PostMapping("/complete/{topicId}")
    public ResponseEntity<?> completeTopic(@PathVariable Integer topicId, Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.badRequest().body("User authentication required");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        Topic topic = topicRepository.findById(topicId).orElseThrow();

        StudentProgress progress = progressRepository.findByUserIdAndTopicId(user.getId(), topicId)
                .orElse(new StudentProgress(user, topic, false, null));

        boolean wasAlreadyCompleted = Boolean.TRUE.equals(progress.getIsCompleted());

        progress.setIsCompleted(true);
        progress.setCompletedAt(LocalDateTime.now());
        progressRepository.save(progress);

        if (!wasAlreadyCompleted) {
            user.setXp(user.getXp() + 50);
            int newLevel = (user.getXp() / 100) + 1;
            user.setLevel(newLevel);
            userRepository.save(user);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Topic completed successfully!");
        response.put("xpGained", wasAlreadyCompleted ? 0 : 50);
        response.put("totalXp", user.getXp());
        response.put("level", user.getLevel());

        return ResponseEntity.ok(response);
    }
}
