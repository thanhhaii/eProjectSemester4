package com.eproject.backend.repositories;

import com.eproject.backend.entities.UserRole;
import com.eproject.backend.entities.UserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepo extends JpaRepository<UserRole, UserRoleId> {

}
