package com.LMS.backend.repository;

import com.LMS.backend.entity.Book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository
        extends JpaRepository<Book, Long> {

    // SEARCH BY TITLE
    List<Book> findByTitleContainingIgnoreCase(
            String title);

    // SEARCH BY ISBN
    List<Book> findByIsbnContainingIgnoreCase(
            String isbn);

    // PAGINATION + SORTING
    Page<Book> findAll(
            Pageable pageable);
}