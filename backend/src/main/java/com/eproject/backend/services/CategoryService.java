package com.eproject.backend.services;

import com.eproject.backend.dtos.categories.CategoryResponse;
import com.eproject.backend.dtos.categories.TypeAhead;
import com.eproject.backend.entities.Category;
import com.eproject.backend.entities.ImageCategory;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> findAllCategory();

    Category createCategory(Category category);

    Category updateCategory(Category category);

    void deleteCategory(int categoryID);

    List<TypeAhead> getTypeAhead(String keyword);
}
