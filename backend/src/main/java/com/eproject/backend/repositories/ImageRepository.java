package com.eproject.backend.repositories;

import com.eproject.backend.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ImageRepository extends JpaRepository<Image, String> {

    @Query("select (count(id) > 0) from Image where id = :imageID and userId = :userID")
    Boolean isOwnerImage(@Param("userID") String userID, @Param("imageID") String imageID);

    @Modifying
    @Transactional
    @Query("UPDATE Image SET imageInfo = :imageInfo where id = :imageID")
    void updateImageInfo(@Param("imageInfo") String imageInfo, @Param("imageID") String imageID);

}