package com.eproject.backend.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.eproject.backend.configurations.ConfigProperties;
import com.eproject.backend.entities.Token;
import com.eproject.backend.entities.User;
import com.eproject.backend.repositories.TokenRepo;
import com.eproject.backend.repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final ConfigProperties configProp;

    private final TokenRepo tokenRepo;

    private final UserRepo userRepo;

    @Override
    public String generateTokenIncludeUserID(String email, int tokenType) {
        User user = userRepo.findByEmail(email);
        Algorithm algorithm = Algorithm.HMAC256(configProp.getConfigValue("jwt.secretKey").getBytes());
        Date expiresAt = new Date(System.currentTimeMillis() + 5 * 60 * 1000);
        String resetPasswordToken = JWT.create()
                .withSubject(user.getId())
                .withExpiresAt(expiresAt)
                .sign(algorithm);
        Token token = new Token(user, expiresAt, tokenType);
        tokenRepo.save(token);
        return resetPasswordToken;
    }


}
