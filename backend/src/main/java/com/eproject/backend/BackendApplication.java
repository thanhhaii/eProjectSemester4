package com.eproject.backend;

import com.cloudinary.Cloudinary;
import com.eproject.backend.common.ERole;
import com.eproject.backend.configurations.ConfigProperties;
import com.eproject.backend.entities.Role;
import com.eproject.backend.entities.User;
import com.eproject.backend.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Autowired
    private ConfigProperties configProp;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run(IUserService iUserService) {
        return args -> {
            iUserService.saveRole(new Role(new Date(), ERole.ROLE_USER.toString(), new Date()));
            iUserService.saveRole(new Role(new Date(), ERole.ROLE_MOD.toString(), new Date()));
            iUserService.saveRole(new Role(new Date(), ERole.ROLE_ADMIN.toString(), new Date()));

            iUserService.saveUser(new User("admin", "hailamnguyenthanh@gmail.com", "admin", "", false));
            iUserService.addRoleToUser("admin", ERole.ROLE_ADMIN.toString());
        };
    }

    @Bean
    public Cloudinary cloudinaryConfig(){
        Cloudinary cloudinary = null;
        Map<String, String> config = new HashMap();
        config.put("cloud_name", configProp.getConfigValue("cloud_name"));
        config.put("api_key", configProp.getConfigValue("API_key"));
        config.put("api_secret", configProp.getConfigValue("API_secret"));
        cloudinary = new Cloudinary(config);
        return cloudinary;
    }

}
