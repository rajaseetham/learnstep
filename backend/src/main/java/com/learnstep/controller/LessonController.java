package com.learnstep.controller;

import com.learnstep.entity.Lesson;
import com.learnstep.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    @Autowired
    private LessonRepository lessonRepository;

    @GetMapping("/topic/{topicId}")
    public List<Lesson> getLessonsByTopic(@PathVariable Integer topicId) {
        return lessonRepository.findByTopicId(topicId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Long id) {
        return lessonRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Lesson createLesson(@RequestBody Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable Long id, @RequestBody Lesson lessonDetails) {
        return lessonRepository.findById(id).map(lesson -> {
            lesson.setTitle(lessonDetails.getTitle());
            lesson.setExplanation(lessonDetails.getExplanation());
            lesson.setRealLifeAnalogy(lessonDetails.getRealLifeAnalogy());
            lesson.setJavaCodeSnippet(lessonDetails.getJavaCodeSnippet());
            lesson.setXpReward(lessonDetails.getXpReward());
            return ResponseEntity.ok(lessonRepository.save(lesson));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLesson(@PathVariable Long id) {
        return lessonRepository.findById(id).map(lesson -> {
            lessonRepository.delete(lesson);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
