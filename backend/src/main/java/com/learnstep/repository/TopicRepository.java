package com.learnstep.repository;

import com.learnstep.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Integer> {
    List<Topic> findAllByOrderByStepNumberAsc();
    Optional<Topic> findByStepNumber(Integer stepNumber);
}
