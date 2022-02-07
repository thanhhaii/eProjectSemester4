package com.eproject.backend.controllers;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.eproject.backend.common.ERole;
import com.eproject.backend.common.TokenType;
import com.eproject.backend.common.exception.EmailExistException;
import com.eproject.backend.common.exception.UserNameExistException;
import com.eproject.backend.dtos.*;
import com.eproject.backend.dtos.users.*;
import com.eproject.backend.entities.Role;
import com.eproject.backend.entities.User;
import com.eproject.backend.helpers.mail.SendMailHelper;
import com.eproject.backend.helpers.token.JwtUtils;
import com.eproject.backend.services.TokenService;
import com.eproject.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService iUserService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TokenService iTokenService;
    private final JavaMailSender javaMailSender;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(iUserService.getUsers());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated @RequestBody SignUp signUp) {
        try {
            String passwordEncoder = bCryptPasswordEncoder.encode(signUp.getPassword());
            User user = new User(signUp.getUsername(), signUp.getEmail(), passwordEncoder);
            User userCreate = iUserService.saveUser(user);
            iUserService.addRoleToUser(user.getUsername(), ERole.ROLE_USER.toString());
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/sign-up").toUriString());
            return ResponseEntity.created(uri).body(userCreate.getId());
        } catch (UserNameExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new MessageResponse("Username is exist!"));
        } catch (EmailExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new MessageResponse("Email is exist!"));
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe() {
        try {
            UsernamePasswordAuthenticationToken userContext = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            UserResponse userResponse = iUserService.getUserByID(userContext.getPrincipal().toString());
            return ResponseEntity.ok(userResponse);
        }catch (Exception e){
            return new ResponseEntity(new MessageResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody UserProfileUpdate userProfileUpdate) {
        try {
            UsernamePasswordAuthenticationToken userContext = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            iUserService.updateProfileUser(userProfileUpdate, userContext.getPrincipal().toString());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/role/add-to-user")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm form) {
        iUserService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPasswordByEmail(@RequestBody UserEmailRequest userEmailRequest) {
        try {
            if (!iUserService.checkEmailExist(userEmailRequest.getEmail())) {
                return ResponseEntity.badRequest().body(new MessageResponse("Email is not used"));
            }
            String token = iTokenService.generateTokenIncludeUserID(userEmailRequest.getEmail(), TokenType.TYPE_RESET_PASSWORD);
            SendMailHelper sendMailHelper = new SendMailHelper();
            String content = "<a " + "href='http://localhost:3000/reset-password?t=" + token + "'" + ">";
            content += "Link reset password</a>";
            sendMailHelper.sendHTMLMail(content, userEmailRequest.getEmail(), javaMailSender);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        }
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody UserResetPassword userResetPassword) throws Exception {
        try {
            JwtUtils jwtUtils = new JwtUtils(userResetPassword.getToken());
            if (jwtUtils.validateJwtToken()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            String userID = jwtUtils.getSubjectToken();
            iUserService.resetPassword(userID, userResetPassword.getNewPassword());
            return ResponseEntity.ok().build();
        } catch (TokenExpiredException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse(e.getMessage()));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> sendMailVerifyAccount(@RequestBody UserEmailRequest userEmailRequest) {
        try {
            if (iUserService.checkEmailExist(userEmailRequest.getEmail())) {
                return ResponseEntity.badRequest().body(new MessageResponse("Email is not used"));
            }
            String token = iTokenService.generateTokenIncludeUserID(userEmailRequest.getEmail(), TokenType.TYPE_ACTIVE_ACCOUNT);
            SendMailHelper sendMailHelper = new SendMailHelper();
            sendMailHelper.sendHTMLMail(token, userEmailRequest.getEmail(), javaMailSender);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        }
    }

    @PutMapping("/verify-email")
    public ResponseEntity<?> verifyAccount(@RequestBody UserTokenRequest userTokenRequest) {
        try {
            JwtUtils jwtUtils = new JwtUtils(userTokenRequest.getToken());
            if (jwtUtils.validateJwtToken()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            String userID = jwtUtils.getSubjectToken();
            iUserService.activeAccount(userID);
            return ResponseEntity.ok().build();
        } catch (TokenExpiredException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePassword changePassword){
        try {
            UsernamePasswordAuthenticationToken userContext = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            iUserService.changePassword(changePassword, userContext.getPrincipal().toString());
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        }
    }

}
