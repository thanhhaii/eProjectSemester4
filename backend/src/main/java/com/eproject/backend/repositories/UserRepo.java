package com.eproject.backend.repositories;

import com.eproject.backend.dtos.users.UserResponse;
import com.eproject.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepo extends JpaRepository<User, String> {

    @Query("from User where username = :username")
    User findByUsername(@Param("username") String username);

    @Query("from User where email = :email")
    User findByEmail(@Param("email") String email);

    @Query("select new com.eproject.backend.dtos.users.UserResponse(id,username, email, profile, about, verifyEmail, createdAt, updatedAt, userRoles) from User where id = :userID")
    UserResponse findMe(@Param("userID") String userID);

    @Modifying
    @Query("update User set profile = :profile where id = :userID")
    int updateProfile(@Param("profile") String profile, @Param("userID") String userID);

    @Modifying
    @Query("update User set about = :about where id = :userID")
    int updateAbout(@Param("about") String about, @Param("userID") String userID);

    @Query("select (count(username) > 0) from User where username = :username")
    Boolean checkExistByUsername(@Param("username") String username);

    @Query("select (count(email) > 0) from User where email = :email")
    Boolean checkExistByEmail(@Param("email") String email);
}
