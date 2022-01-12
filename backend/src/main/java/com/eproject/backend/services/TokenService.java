package com.eproject.backend.services;

public interface TokenService {

    String generateTokenIncludeUserID(String email, int tokenType);

}
