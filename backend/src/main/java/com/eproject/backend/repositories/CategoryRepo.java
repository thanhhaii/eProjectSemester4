package com.eproject.backend.repositories;

import com.eproject.backend.dtos.categories.TypeAhead;
import com.eproject.backend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {

    @Query("select new com.eproject.backend.dtos.categories.TypeAhead(id, categoryName) from Category where categoryName LIKE %:keyword%")
    List<TypeAhead> typeAhead(@Param("keyword") String keyword);

}