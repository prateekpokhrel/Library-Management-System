// src/services/categoryService.js

import api from "./api";

export const getAllCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
};

export const addCategory = async (categoryName) => {
    const response = await api.post(
        "/categories",
        {
            categoryName,
        }
    );

    return response.data;
};

export const updateCategory = async (
    id,
    categoryName
) => {

    const response = await api.put(
        `/categories/${id}`,
        {
            categoryName,
        }
    );

    return response.data;
};

export const deleteCategory = async (
    id
) => {

    await api.delete(
        `/categories/${id}`
    );
};