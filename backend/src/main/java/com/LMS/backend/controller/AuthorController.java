package com.LMS.backend.controller;

import com.LMS.backend.dto.AuthorRequest;
import com.LMS.backend.entity.Author;
import com.LMS.backend.service.AuthorService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

    @PostMapping
    public Author addAuthor(
            @RequestBody AuthorRequest request) {

        return authorService.addAuthor(request);
    }

    @GetMapping
    public List<Author> getAllAuthors() {

        return authorService.getAllAuthors();
    }

    @GetMapping("/{id}")
    public Author getAuthorById(
            @PathVariable Long id) {

        return authorService.getAuthorById(id);
    }

    @PutMapping("/{id}")
    public Author updateAuthor(
            @PathVariable Long id,
            @RequestBody AuthorRequest request) {

        return authorService.updateAuthor(
                id,
                request);
    }

    @DeleteMapping("/{id}")
    public void deleteAuthor(
            @PathVariable Long id) {

        authorService.deleteAuthor(id);
    }
}