package com.eproject.backend.services;

import com.eproject.backend.dtos.RequestPagination;
import com.eproject.backend.dtos.UploadFileResponse;
import com.eproject.backend.dtos.images.GetListImageResponse;
import com.eproject.backend.dtos.images.ImageInfo;
import com.eproject.backend.dtos.images.ImageUpdateInfo;
import com.eproject.backend.entities.Image;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ImageService {

    UploadFileResponse uploadFile(MultipartFile file, String userID);

    void deleteImage(String imageID);

    boolean isOwnerImage(String imageID, String userID);

    void updateImageInfo(ImageUpdateInfo ImageUpdateInfo, String imageID) throws JsonProcessingException;

    List<Image> getListImage(RequestPagination requestPagination);

    List<Image> getMyImage(String userID);
}
