package com.eproject.backend.services;

import com.eproject.backend.entities.Category;

import java.util.List;

public interface CategoryService {

    List<Category> findAllCategory();

    Category createCategory(Category category);

    Category updateCategory(Category category);

    void deleteCategory(int categoryID);
}
