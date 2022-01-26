package com.eproject.backend.services;

import com.eproject.backend.dtos.categories.CategoryResponse;
import com.eproject.backend.dtos.categories.TypeAhead;
import com.eproject.backend.entities.Category;
import com.eproject.backend.entities.ImageCategory;
import com.eproject.backend.repositories.CategoryRepo;
import com.eproject.backend.repositories.ImageCategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepo categoryRepo;

    private final ImageCategoryRepo imageCategoryRepo;

    @Override
    public List<CategoryResponse> findAllCategory() {
        List<CategoryResponse> responses = new ArrayList<>();
        categoryRepo.findAll().forEach(category -> {
            responses.add(new CategoryResponse(
                    category.getId(),
                    category.getCategoryName(),
                    category.getDescription(),
                    category.getCreatedAt(),
                    category.getUpdatedAt()
            ));
        });
        return responses;
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

    @Override
    public List<TypeAhead> getTypeAhead(String keyword) {
        return categoryRepo.typeAhead(keyword);
    }

}
