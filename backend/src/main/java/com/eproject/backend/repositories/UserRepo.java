package com.eproject.backend.repositories;

import com.eproject.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepo extends JpaRepository<User, byte[]> {

    @Query("from User where username = :username")
    User findByUsername(@Param("username") String username);

}
