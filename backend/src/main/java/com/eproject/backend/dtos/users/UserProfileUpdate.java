package com.eproject.backend.dtos.users;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileUpdate {

    private String profile;

    private boolean verifyEmail;

}
