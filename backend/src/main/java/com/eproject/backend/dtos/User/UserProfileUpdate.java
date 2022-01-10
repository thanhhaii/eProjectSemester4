package com.eproject.backend.dtos.User;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class UserProfileUpdate {

    private String profile;

    private boolean verifyEmail;

}
