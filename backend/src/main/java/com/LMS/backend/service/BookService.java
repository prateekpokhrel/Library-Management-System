package com.LMS.backend.service;

import com.LMS.backend.dto.BookRequest;
import com.LMS.backend.entity.Book;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {

    // CREATE
    Book addBook(
            String title,
            String isbn,
            Integer quantity,
            Long authorId,
            Long categoryId,
            Long publisherId,
            MultipartFile coverImage
    );

    // READ
    List<Book> getAllBooks();

    Book getBookById(Long id);

    // UPDATE
    Book updateBook(
            Long id,
            BookRequest request);

    // DELETE
    void deleteBook(Long id);

    // SEARCH
    List<Book> searchBooks(String keyword);

    // PAGINATION + SORTING
    Page<Book> getBooksPaged(
            int page,
            int size,
            String sortBy);
}