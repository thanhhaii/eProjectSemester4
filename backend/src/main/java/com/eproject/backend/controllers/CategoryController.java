package com.eproject.backend.controllers;

import com.eproject.backend.dtos.categories.AddImageToCategory;
import com.eproject.backend.dtos.categories.CategoryCreate;
import com.eproject.backend.dtos.categories.CategoryResponse;
import com.eproject.backend.dtos.categories.CategoryUpdate;
import com.eproject.backend.entities.Category;
import com.eproject.backend.entities.ImageCategory;
import com.eproject.backend.entities.ImageCategoryId;
import com.eproject.backend.services.CategoryService;
import com.eproject.backend.services.ImageCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final ImageCategoryService imageCategoryService;

    @GetMapping("")
    public ResponseEntity<?> getAllCategories() {
        try {
            List<CategoryResponse> categoryList = categoryService.findAllCategory();
            return ResponseEntity.ok(categoryList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("")

    public ResponseEntity<?> createCategory(@RequestBody CategoryCreate categoryCreate) {
        try {
            Category category = new Category(categoryCreate.getCategoryName(), categoryCreate.getDescription());
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/categories").toUriString());
            return ResponseEntity.created(uri).body(categoryService.createCategory(category));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("")
    public ResponseEntity<?> updateCategory(@RequestBody CategoryUpdate categoryUpdate) {
        try {
            Category category = new Category(categoryUpdate.getId(), categoryUpdate.getCategoryName(), categoryUpdate.getDescription());
            Category response = categoryService.updateCategory(category);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") int id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/add-category-image")
    public ResponseEntity<?> addImageToCategory(@RequestBody AddImageToCategory addImageToCategory) {
        try {
            List<ImageCategory> imageCategories = new ArrayList<>();
            addImageToCategory.getCategoryIDs().forEach(category -> {
                imageCategories.add(new ImageCategory(new ImageCategoryId(addImageToCategory.getImageID(), category)));
            });
            imageCategoryService.addImageCategory(imageCategories);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/typeahead")
    public ResponseEntity<?> typeAheadCategory(@RequestParam("keyword") String keyword){
        try {
            return ResponseEntity.ok(categoryService.getTypeAhead(keyword));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
