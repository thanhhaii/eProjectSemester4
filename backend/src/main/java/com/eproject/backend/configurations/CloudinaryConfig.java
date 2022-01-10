package com.eproject.backend.configurations;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class CloudinaryConfig {

    private final ConfigProperties configProp;

    @Bean
    public Cloudinary cloudinary(){
        Cloudinary cloudinary = null;
        Map<String, String> config = new HashMap();
        config.put("cloud_name", configProp.getConfigValue("cloud_name"));
        config.put("api_key", configProp.getConfigValue("API_key"));
        config.put("api_secret", configProp.getConfigValue("API_secret"));
        cloudinary = new Cloudinary(config);
        return cloudinary;
    }

}
