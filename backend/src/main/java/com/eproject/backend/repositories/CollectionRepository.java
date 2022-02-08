package com.eproject.backend.repositories;

import com.eproject.backend.entities.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CollectionRepository extends CrudRepository<Collection, String> {

    @Query("select (count(user) > 0) from Collection where user.id = :ownerID")
    boolean hasCollection(@Param("ownerID") String ownerID);

    @Query("from Collection where user.id = :ownerID")
    Collection getCollectionByOwnerID(@Param("ownerID") String ownerID);

}