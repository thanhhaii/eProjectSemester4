package com.eproject.backend.repositories;

import com.eproject.backend.entities.ImageCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ImageCountRepo extends JpaRepository<ImageCount, String> {

    @Modifying
    @Query("UPDATE ImageCount SET downloadCount = downloadCount + 1 WHERE imageId = :imageID")
    void updateCountDownload(@Param("imageID") String imageID);

    @Modifying
    @Query("UPDATE ImageCount SET addCollectionCount = addCollectionCount + 1 WHERE imageId = :imageID")
    void addToCollection(@Param("imageID") String imageID);

    @Modifying
    @Query("UPDATE ImageCount SET addCollectionCount = addCollectionCount - 1 WHERE imageId = :imageID")
    void removeFromCollection(@Param("imageID") String imageID);

}