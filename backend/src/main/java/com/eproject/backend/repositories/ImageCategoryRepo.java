package com.eproject.backend.repositories;

import com.eproject.backend.entities.ImageCategory;
import com.eproject.backend.entities.ImageCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ImageCategoryRepo extends JpaRepository<ImageCategory, ImageCategoryId> {

    @Transactional
    @Modifying
    @Query("delete from ImageCategory where id.imageId = :imageID")
    void deleteImageCategory(@Param("imageID") String imageID);

    @Modifying
    @Query("update Image set imageInfo = :info where id = :imageID")
    void updateInfoCategory(@Param("info") String info, @Param("imageID") String imageID);

}