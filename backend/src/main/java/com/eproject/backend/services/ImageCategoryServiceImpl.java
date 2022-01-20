package com.eproject.backend.services;

import com.eproject.backend.dtos.images.ImageInfo;
import com.eproject.backend.entities.ImageCategory;
import com.eproject.backend.repositories.ImageCategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageCategoryServiceImpl implements ImageCategoryService{

    private final ImageCategoryRepo imageCategoryRepo;

    @Override
    public void addImageCategory(Iterable<ImageCategory> imageCategories) {
        imageCategoryRepo.saveAll(imageCategories);
    }

    @Override
    public void deleteImageCategory(String imageID) {
        imageCategoryRepo.deleteImageCategory(imageID);
    }
}
