package com.eproject.backend.services;

import com.eproject.backend.entities.Role;
import com.eproject.backend.entities.User;

import java.util.List;

public interface IUserService {

    User saveUser(User user);

    Role saveRole(Role role);

    void addRoleToUser(String username, String roleName);

    User getUser(String username);

    List<User> getUsers();
}
