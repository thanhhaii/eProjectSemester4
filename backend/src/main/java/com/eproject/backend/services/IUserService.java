package com.eproject.backend.services;

import com.eproject.backend.dtos.User.UserResponse;
import com.eproject.backend.dtos.User.UserProfileUpdate;
import com.eproject.backend.entities.Role;
import com.eproject.backend.entities.User;

import java.util.List;

public interface IUserService {

    User saveUser(User user) throws Exception;

    Role saveRole(Role role);

    void addRoleToUser(String username, String roleName);

    User getUser(String username);

    UserResponse getUserByID(String userID);

    List<User> getUsers();

    void updateProfileUser(UserProfileUpdate userProfileUpdate, String userID) throws Exception;

    Boolean checkEmailExist(String email);

    void resetPassword(String userID, String newPassword);

    void activeAccount(String userID);
}
