package com.eproject.backend.repositories;

import com.eproject.backend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Integer> {
    Role findByName(String  name);
}
