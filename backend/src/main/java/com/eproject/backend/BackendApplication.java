package com.eproject.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("*")
                        .allowedOrigins("http://localhost:3000")
                        .allowCredentials(true);
            }
        };
    }

//    @Bean
//    CommandLineRunner run(UserService iUserService) {
//        return args -> {
//            iUserService.saveRole(new Role(new Date(), ERole.ROLE_USER.toString(), new Date()));
//            iUserService.saveRole(new Role(new Date(), ERole.ROLE_MOD.toString(), new Date()));
//            iUserService.saveRole(new Role(new Date(), ERole.ROLE_ADMIN.toString(), new Date()));
//
//            iUserService.saveUser(new User("admin", "hailamnguyenthanh@gmail.com", "admin", "", false));
//            iUserService.addRoleToUser("admin", ERole.ROLE_ADMIN.toString());
//        };
//    }

}
