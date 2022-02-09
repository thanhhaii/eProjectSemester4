package com.eproject.backend.repositories;

import com.eproject.backend.dtos.RequestPagination;
import com.eproject.backend.dtos.images.GetListImageResponse;
import com.eproject.backend.entities.Image;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, String> {

    @Query("select (count(id) > 0) from Image where id = :imageID and user.id = :userID")
    Boolean isOwnerImage(@Param("userID") String userID, @Param("imageID") String imageID);

    @Modifying
    @Transactional
    @Query("UPDATE Image SET imageInfo = :imageInfo where id = :imageID")
    void updateImageInfo(@Param("imageInfo") String imageInfo, @Param("imageID") String imageID);

    @Query(value = "select * from image order by created_at desc limit :start, :limit", nativeQuery = true)
    List<Image> getList(@Param("start") int start, @Param("limit") int limit);

    @Query("from Image where user.id = :userID")
    List<Image> getMyImage(@Param("userID") String userID);
}