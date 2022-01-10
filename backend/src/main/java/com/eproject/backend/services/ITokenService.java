package com.eproject.backend.services;

public interface ITokenService {

    String generateTokenIncludeUserID(String email, int tokenType);

}
