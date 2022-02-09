package com.eproject.backend.services;

import com.eproject.backend.dtos.users.ChangePassword;
import com.eproject.backend.dtos.users.UserResponse;
import com.eproject.backend.dtos.users.UserProfileUpdate;
import com.eproject.backend.entities.Image;
import com.eproject.backend.entities.Role;
import com.eproject.backend.entities.User;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface UserService {

    User saveUser(User user) throws Exception;

    Role saveRole(Role role);

    void addRoleToUser(String username, String roleName);

    User getUser(String username);

    UserResponse getUserByID(String userID) throws JsonProcessingException;

    List<User> getUsers();

    void updateProfileUser(UserProfileUpdate userProfileUpdate, String userID) throws Exception;

    Boolean checkEmailExist(String email);

    void resetPassword(String userID, String newPassword);

    void activeAccount(String userID);

    void changePassword(ChangePassword changePassword, String userID) throws Exception;

}
