package com.learnstep.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String icon;

    @Column(length = 1000)
    private String description;

    private Integer stepNumber;

    private Integer levelRequired;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Lesson> lessons;

    public Topic() {}

    public Topic(String title, String icon, String description, Integer stepNumber, Integer levelRequired) {
        this.title = title;
        this.icon = icon;
        this.description = description;
        this.stepNumber = stepNumber;
        this.levelRequired = levelRequired;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getIcon() { return icon; }
    public String getDescription() { return description; }
    public Integer getStepNumber() { return stepNumber; }
    public Integer getLevelRequired() { return levelRequired; }
}
