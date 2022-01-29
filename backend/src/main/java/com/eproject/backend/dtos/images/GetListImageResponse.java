package com.eproject.backend.dtos.images;

import com.eproject.backend.entities.Image;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetListImageResponse {

    private String id;
    private ImageInfo imageInfo;
    private String imageUrl;
    private boolean isPremium = false;
    private String userID;
    private String username;
    private String userInfo;
    private Date updatedAt;
    private Date createdAt;
    private List<String> categories = new ArrayList<>();

    public GetListImageResponse(Image image) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        id = image.getId();
        if(image.getImageInfo() != null){
            imageInfo = mapper.readValue(image.getImageInfo(), ImageInfo.class);
        }
        imageUrl = image.getImageUrl();
        isPremium = image.isPremium();
        userID = image.getUser().getId();
        username = image.getUser().getUsername();
        userInfo = image.getUser().getProfile();
        updatedAt = image.getUpdatedAt();
        createdAt = image.getCreatedAt();
        if(!image.getImageCategories().isEmpty()){
            image.getImageCategories().forEach(item -> {
                categories.add(item.getCategory().getCategoryName());
            });
        }
    }
}
