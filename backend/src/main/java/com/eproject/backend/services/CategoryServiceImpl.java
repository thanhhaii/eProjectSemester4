package com.eproject.backend.services;

import com.eproject.backend.entities.Category;
import com.eproject.backend.entities.ImageCategory;
import com.eproject.backend.repositories.CategoryRepo;
import com.eproject.backend.repositories.ImageCategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepo categoryRepo;

    private final ImageCategoryRepo imageCategoryRepo;

    @Override
    public List<Category> findAllCategory() {
        return categoryRepo.findAll();
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepo.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return categoryRepo.save(category);
    }

    @Override
    public void deleteCategory(int categoryID) {
        categoryRepo.deleteById(categoryID);
    }

}
