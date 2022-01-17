package com.eproject.backend.helpers.token;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.eproject.backend.configurations.ConfigProperties;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import com.auth0.jwt.JWT;

import java.util.Date;

@Data
public class JwtUtils {

    @Autowired
    private ConfigProperties configProp;

    private String token;

    public JwtUtils(String token) {
        this.token = token;
    }

    public boolean validateJwtToken() throws Exception {
        try {
            Algorithm algorithm = Algorithm.HMAC256(configProp.getConfigValue("jwt.secretKey").getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            verifier.verify(token);
            return true;
        } catch (TokenExpiredException e) {
            throw new TokenExpiredException("The token period has expired");
        } catch (Exception e) {
            return false;
        }
    }

    public String getSubjectToken() throws TokenExpiredException {
        Algorithm algorithm = Algorithm.HMAC256(configProp.getConfigValue("jwt.secretKey").getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        if (decodedJWT.getExpiresAt().before(new Date())) {
            throw new TokenExpiredException("Token is expired");
        }
        return decodedJWT.getSubject();
    }

}
