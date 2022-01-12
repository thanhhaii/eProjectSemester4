package com.eproject.backend.dtos.users;

import com.eproject.backend.entities.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private String id;

    private String username;

    private String email;

    private String profile;

    private boolean verifyEmail;

    private Date createdAt;

    private Date updatedAt;

    private List<String> roles = new ArrayList<>();

    public UserResponse(String id, String username, String email, String profile, boolean verifyEmail, Date createdAt, Date updatedAt, Set<UserRole> userRoles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.profile = profile;
        this.verifyEmail = verifyEmail;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        userRoles.forEach(role -> {
            this.roles.add(role.getRole().getName());
        });
    }
}
