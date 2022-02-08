package com.eproject.backend.repositories;

import com.eproject.backend.entities.ImageCollection;
import com.eproject.backend.entities.ImageCollectionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ImageCollectionRepository extends JpaRepository<ImageCollection, ImageCollectionId> {

    @Query("select (count(image) > 0)from ImageCollection where id.imageId = :imageID and id.collectionId = :collectionID")
    boolean checkImageExistOnCollection(@Param("collectionID")String collectionID, @Param("imageID")String imageID);

}