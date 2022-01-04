package com.eproject.backend.repositories;

import com.eproject.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, byte[]> {

    User findByUsername(String username);

}
