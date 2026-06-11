package com.LMS.backend.repository;

import com.LMS.backend.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublisherRepository
        extends JpaRepository<Publisher, Long> {
}