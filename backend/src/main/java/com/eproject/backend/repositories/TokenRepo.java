package com.eproject.backend.repositories;

import com.eproject.backend.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface TokenRepo extends JpaRepository<Token, String> {

}
