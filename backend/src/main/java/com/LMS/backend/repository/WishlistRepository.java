package com.LMS.backend.repository;

import com.LMS.backend.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository
        extends JpaRepository<Wishlist, Long> {

    List<Wishlist> findByUser_Id(Long userId);

    boolean existsByUser_IdAndBook_Id(
            Long userId,
            Long bookId
    );

    void deleteByUser_IdAndBook_Id(
            Long userId,
            Long bookId
    );
}