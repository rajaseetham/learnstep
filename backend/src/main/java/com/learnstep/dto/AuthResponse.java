package com.learnstep.dto;

import java.util.List;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String avatar;
    private Integer xp;
    private Integer level;
    private Integer streakCount;
    private List<String> roles;

    public AuthResponse(String token, Long id, String username, String email, String avatar, Integer xp, Integer level, Integer streakCount, List<String> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.avatar = avatar;
        this.xp = xp;
        this.level = level;
        this.streakCount = streakCount;
        this.roles = roles;
    }

    public String getToken() { return token; }
    public String getType() { return type; }
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getAvatar() { return avatar; }
    public Integer getXp() { return xp; }
    public Integer getLevel() { return level; }
    public Integer getStreakCount() { return streakCount; }
    public List<String> getRoles() { return roles; }
}
