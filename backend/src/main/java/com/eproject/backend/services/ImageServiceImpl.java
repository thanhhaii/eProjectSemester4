package com.eproject.backend.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.eproject.backend.dtos.UploadFileResponse;
import com.eproject.backend.dtos.images.ImageInfo;
import com.eproject.backend.entities.Image;
import com.eproject.backend.repositories.ImageRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.AuthenticationException;
import java.util.Date;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@Service
public class ImageServiceImpl implements ImageService {

    private final Cloudinary cloudinaryConfig;
    private final ImageRepository imageRepository;
    private final ImageCountService imageCountService;

    @Override
    public UploadFileResponse uploadFile(MultipartFile file, String userID) {
        try {
            Map params = ObjectUtils.asMap(
                    "folder", "image"
            );
            Map uploadResult = cloudinaryConfig.uploader().upload(file.getBytes(), params);
            String fileType = uploadResult.get("resource_type") + "/" + uploadResult.get("format");
            UploadFileResponse uploadFileResponse = new UploadFileResponse(
                    uploadResult.get("secure_url").toString(),
                    Integer.parseInt(uploadResult.get("height").toString()),
                    Integer.parseInt(uploadResult.get("width").toString()),
                    fileType,
                    new Date()
            );
            Image imageResult = imageRepository.save(new Image(uploadFileResponse.getUrl(), userID));
            imageCountService.createImageCount(imageResult.getId());
            return uploadFileResponse;
        } catch (Exception e) {
            log.error("Upload file fail: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteImage(String imageID) {
        imageRepository.deleteById(imageID);
    }

    @Override
    public boolean isOwnerImage(String imageID, String userID) {
        return imageRepository.isOwnerImage(userID, imageID);
    }

    @Override
    public void updateImageInfo(ImageInfo imageInfo, String imageID) throws JsonProcessingException {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(imageInfo);
        imageRepository.updateImageInfo(json, imageID);
    }
}
