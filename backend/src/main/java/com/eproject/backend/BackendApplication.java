package com.eproject.backend;

import com.eproject.backend.common.ERole;
import com.eproject.backend.entities.Role;
import com.eproject.backend.services.IUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run(IUserService iUserService){
        return args -> {
            iUserService.saveRole(new Role(new Date(), ERole.ROLE_USER.toString(), new Date()));
            iUserService.saveRole(new Role(new Date(), ERole.ROLE_MOD.toString(), new Date()));
            iUserService.saveRole(new Role(new Date(), ERole.ROLE_ADMIN.toString(), new Date()));
        };
    }

}
