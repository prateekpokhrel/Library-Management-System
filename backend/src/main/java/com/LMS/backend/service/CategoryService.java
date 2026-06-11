package com.LMS.backend.service;

import com.LMS.backend.dto.CategoryRequest;
import com.LMS.backend.entity.Category;

import java.util.List;

public interface CategoryService {

    Category addCategory(CategoryRequest request);

    List<Category> getAllCategories();

    Category getCategoryById(Long id);

    Category updateCategory(Long id,
                            CategoryRequest request);

    void deleteCategory(Long id);
}