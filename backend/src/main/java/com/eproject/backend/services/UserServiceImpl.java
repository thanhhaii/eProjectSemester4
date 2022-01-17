package com.eproject.backend.services;

import com.eproject.backend.common.exception.EmailExistException;
import com.eproject.backend.common.exception.UserNameExistException;
import com.eproject.backend.dtos.users.UserPrinciple;
import com.eproject.backend.dtos.users.UserProfileUpdate;
import com.eproject.backend.dtos.users.UserResponse;
import com.eproject.backend.entities.Role;
import com.eproject.backend.entities.User;
import com.eproject.backend.entities.UserRole;
import com.eproject.backend.entities.UserRoleId;
import com.eproject.backend.repositories.RoleRepo;
import com.eproject.backend.repositories.UserRepo;
import com.eproject.backend.repositories.UserRoleRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final UserRoleRepo userRoleRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserPrinciple loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in the database: {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getUserRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getRole().getName()));
        });
        return new UserPrinciple(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }

    @Override
    public User saveUser(User user) throws Exception {
        if(userRepo.checkExistByUsername(user.getUsername())){
            throw new UserNameExistException();
        }
        if(userRepo.checkExistByEmail(user.getEmail())){
            throw new EmailExistException();
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        User user = userRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        userRoleRepo.save(new UserRole(
                new UserRoleId(role.getId(), user.getId()),
                role,
                user,
                new Date()
        ));
    }

    @Override
    public User getUser(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public UserResponse getUserByID(String userID) {
        User user = userRepo.findById(userID).get();
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getProfile(),
                user.isVerifyEmail(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                user.getUserRoles()
        );
    }

    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @Override
    public void updateProfileUser(UserProfileUpdate userProfileUpdate, String userID) throws Exception {
        try{
            ObjectWriter objectWriter = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String json = objectWriter.writeValueAsString(userProfileUpdate);
            userRepo.updateProfile(json, userID);
        }catch (Exception e){
            throw new Exception();
        }
    }

    @Override
    public Boolean checkEmailExist(String email) {
        return userRepo.checkExistByEmail(email);
    }

    @Override
    public void resetPassword(String userID, String newPassword) {
        User user = userRepo.findById(userID).get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
    }

    @Override
    public void activeAccount(String userID) {
        User user = userRepo.findById(userID).get();
        user.setVerifyEmail(true);
        userRepo.save(user);
    }

}
