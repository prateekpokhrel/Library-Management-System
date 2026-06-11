package com.LMS.backend.service.impl;

import com.LMS.backend.dto.CategoryRequest;
import com.LMS.backend.entity.Category;
import com.LMS.backend.exception.ResourceNotFoundException;
import com.LMS.backend.repository.CategoryRepository;
import com.LMS.backend.service.CategoryService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl
        implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public Category addCategory(
            CategoryRequest request) {

        Category category = Category.builder()
                .categoryName(request.getCategoryName())
                .build();

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {

        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {

        return categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found"));
    }

    @Override
    public Category updateCategory(
            Long id,
            CategoryRequest request) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found"));

        category.setCategoryName(
                request.getCategoryName());

        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {

        categoryRepository.deleteById(id);
    }
}