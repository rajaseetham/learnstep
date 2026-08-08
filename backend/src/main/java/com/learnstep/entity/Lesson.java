package com.learnstep.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String explanation;

    @Column(columnDefinition = "TEXT")
    private String realLifeAnalogy;

    @Column(columnDefinition = "TEXT")
    private String javaCodeSnippet;

    private Integer xpReward = 50;

    public Lesson() {}

    public Lesson(Topic topic, String title, String explanation, String realLifeAnalogy, String javaCodeSnippet, Integer xpReward) {
        this.topic = topic;
        this.title = title;
        this.explanation = explanation;
        this.realLifeAnalogy = realLifeAnalogy;
        this.javaCodeSnippet = javaCodeSnippet;
        this.xpReward = xpReward;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Topic getTopic() { return topic; }
    public void setTopic(Topic topic) { this.topic = topic; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getRealLifeAnalogy() { return realLifeAnalogy; }
    public void setRealLifeAnalogy(String realLifeAnalogy) { this.realLifeAnalogy = realLifeAnalogy; }

    public String getJavaCodeSnippet() { return javaCodeSnippet; }
    public void setJavaCodeSnippet(String javaCodeSnippet) { this.javaCodeSnippet = javaCodeSnippet; }

    public Integer getXpReward() { return xpReward; }
    public void setXpReward(Integer xpReward) { this.xpReward = xpReward; }
}
