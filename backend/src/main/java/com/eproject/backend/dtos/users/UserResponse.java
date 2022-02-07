package com.eproject.backend.dtos.users;

import com.eproject.backend.dtos.images.ImageInfo;
import com.eproject.backend.entities.UserRole;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@NoArgsConstructor
public class UserResponse {

    private String id;

    private String username;

    private String email;

    private UserProfile profile;

    private UserAbout about;

    private boolean verifyEmail;

    private Date createdAt;

    private Date updatedAt;

    private List<String> roles = new ArrayList<>();

    public UserResponse(String id, String username, String email, String profile, String about,
                        boolean verifyEmail, Date createdAt, Date updatedAt,Set<UserRole> userRoles) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        this.id = id;
        this.username = username;
        this.email = email;
        if(profile != null){
            this.profile = mapper.readValue(profile, UserProfile.class);
        }
        if(about != null){
            this.about = mapper.readValue(about, UserAbout.class);
        }
        this.verifyEmail = verifyEmail;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        userRoles.forEach(role -> {
            this.roles.add(role.getRole().getName());
        });
    }

}
