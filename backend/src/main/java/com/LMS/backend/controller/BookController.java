package com.LMS.backend.controller;

import com.LMS.backend.dto.BookRequest;
import com.LMS.backend.entity.Book;
import com.LMS.backend.service.BookService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    // CREATE
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Book addBook(
            @RequestParam String title,
            @RequestParam String isbn,
            @RequestParam Integer quantity,
            @RequestParam Long authorId,
            @RequestParam Long categoryId,
            @RequestParam Long publisherId,
            @RequestParam(required = false) MultipartFile coverImage
    ) {

        return bookService.addBook(
                title,
                isbn,
                quantity,
                authorId,
                categoryId,
                publisherId,
                coverImage
        );
    }

    // GET ALL
    @GetMapping
    public List<Book> getAllBooks() {

        return bookService.getAllBooks();
    }

    // SEARCH
    @GetMapping("/search")
    public List<Book> searchBooks(
            @RequestParam String keyword) {

        return bookService.searchBooks(keyword);
    }

    // PAGINATION + SORTING
    @GetMapping("/paged")
    public Page<Book> getBooksPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "title") String sortBy) {

        return bookService.getBooksPaged(
                page,
                size,
                sortBy);
    }

    // GET BY ID
    @GetMapping("/id/{id}")
    public Book getBookById(
            @PathVariable Long id) {

        return bookService.getBookById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Book updateBook(
            @PathVariable Long id,
            @RequestBody BookRequest request) {

        return bookService.updateBook(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteBook(
            @PathVariable Long id) {

        bookService.deleteBook(id);
    }
}