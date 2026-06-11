package com.LMS.backend.service;

import com.LMS.backend.dto.AuthorRequest;
import com.LMS.backend.entity.Author;

import java.util.List;

public interface AuthorService {

    Author addAuthor(AuthorRequest request);

    List<Author> getAllAuthors();

    Author getAuthorById(Long id);

    Author updateAuthor(Long id, AuthorRequest request);

    void deleteAuthor(Long id);
}