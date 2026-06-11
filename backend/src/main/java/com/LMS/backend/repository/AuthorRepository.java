package com.LMS.backend.repository;

import com.LMS.backend.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository
        extends JpaRepository<Author, Long> {
}