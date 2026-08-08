package com.learnstep.repository;

import com.learnstep.entity.StudentProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentProgressRepository extends JpaRepository<StudentProgress, Long> {
    List<StudentProgress> findByUserId(Long userId);
    Optional<StudentProgress> findByUserIdAndTopicId(Long userId, Integer topicId);
    Long countByUserIdAndIsCompletedTrue(Long userId);
}
