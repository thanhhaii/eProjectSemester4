package com.eproject.backend.services;

import com.eproject.backend.dtos.UploadFileResponse;
import com.eproject.backend.dtos.images.ImageInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface ImageService {

    UploadFileResponse uploadFile(MultipartFile file, String userID);

    void deleteImage(String imageID);

    boolean isOwnerImage(String imageID, String userID);

    void updateImageInfo(ImageInfo imageInfo, String imageID) throws JsonProcessingException;
}
