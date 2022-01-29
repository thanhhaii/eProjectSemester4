package com.eproject.backend.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.eproject.backend.dtos.RequestPagination;
import com.eproject.backend.dtos.UploadFileResponse;
import com.eproject.backend.dtos.images.ImageInfo;
import com.eproject.backend.entities.Category;
import com.eproject.backend.entities.Image;
import com.eproject.backend.entities.ImageCategory;
import com.eproject.backend.repositories.CategoryRepo;
import com.eproject.backend.repositories.ImageRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@Service
public class ImageServiceImpl implements ImageService {

    private final Cloudinary cloudinaryConfig;
    private final ImageRepository imageRepository;
    private final ImageCountService imageCountService;
    private final CategoryRepo categoryRepo;

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
                    ""
            );
            Image imageResult = imageRepository.save(new Image(uploadFileResponse.getUrl(), userID));
            imageCountService.createImageCount(imageResult.getId());
            uploadFileResponse.setFileID(imageResult.getId());
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
        String json = ow.writeValueAsString(imageInfo).replace(" ","");
        imageRepository.updateImageInfo(json, imageID);
    }

    @Override
    public List<Image> getListImage(RequestPagination requestPagination) {
        List<Image> resp = new ArrayList<>();

        if(requestPagination.getFilterType().equals("category") && !requestPagination.getFilterValue().equals("")){
            for(ImageCategory imageCategory : categoryRepo.getListImageFromCategory(requestPagination.getFilterValue()).getImageCategories()){
                resp.add(imageCategory.getImage());
            }
            return resp;
        }
        return imageRepository.getList(requestPagination.getStart(), requestPagination.getLimit());
    }
}
