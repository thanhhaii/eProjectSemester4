package com.eproject.backend.services;

import com.eproject.backend.dtos.images.ImageInfo;
import com.eproject.backend.entities.ImageCategory;

public interface ImageCategoryService {

    void addImageCategory(Iterable<ImageCategory> imageCategories);

    void deleteImageCategory(String imageID);

}
