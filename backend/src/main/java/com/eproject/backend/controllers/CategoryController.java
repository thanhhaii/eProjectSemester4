package com.eproject.backend.controllers;

import com.eproject.backend.dtos.categories.CategoryCreate;
import com.eproject.backend.dtos.categories.CategoryUpdate;
import com.eproject.backend.entities.Category;
import com.eproject.backend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<?> getAllCategories(){
        try {
            List<Category> categoryList = categoryService.findAllCategory();
            return ResponseEntity.ok(categoryList);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("")

    public ResponseEntity<?> createCategory(@RequestBody CategoryCreate categoryCreate){
        try {
            Category category = new Category(categoryCreate.getCategoryName(), categoryCreate.getDescription());
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/categories").toUriString());
            return ResponseEntity.created(uri).body(categoryService.createCategory(category));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("")
    public ResponseEntity<?> updateCategory(@RequestBody CategoryUpdate categoryUpdate){
        try {
            Category category = new Category(categoryUpdate.getId(), categoryUpdate.getCategoryName(), categoryUpdate.getDescription());
            Category response = categoryService.updateCategory(category);
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") int id){
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
