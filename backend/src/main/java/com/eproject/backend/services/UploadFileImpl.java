package com.eproject.backend.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.eproject.backend.dtos.UploadFileResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@Service
public class UploadFileImpl implements IUploadFile {

    private final Cloudinary cloudinaryConfig;

    @Override
    public UploadFileResponse uploadFile(MultipartFile file) {
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
            return uploadFileResponse;
        } catch (Exception e) {
            log.error("Upload file fail: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
