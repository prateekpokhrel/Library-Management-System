package com.LMS.backend.controller;

import com.LMS.backend.dto.CategoryRequest;
import com.LMS.backend.entity.Category;
import com.LMS.backend.service.CategoryService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public Category addCategory(
            @RequestBody CategoryRequest request) {

        return categoryService.addCategory(request);
    }

    @GetMapping
    public List<Category> getAllCategories() {

        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category getCategoryById(
            @PathVariable Long id) {

        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public Category updateCategory(
            @PathVariable Long id,
            @RequestBody CategoryRequest request) {

        return categoryService.updateCategory(
                id,
                request);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(
            @PathVariable Long id) {

        categoryService.deleteCategory(id);
    }
}