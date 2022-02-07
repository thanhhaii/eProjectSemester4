package com.eproject.backend.dtos.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileUpdate {

    private UserProfile userProfile;
    private UserAbout userAbout;

}
