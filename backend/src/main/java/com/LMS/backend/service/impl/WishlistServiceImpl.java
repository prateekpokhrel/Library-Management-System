package com.LMS.backend.service.impl;

import com.LMS.backend.entity.Book;
import com.LMS.backend.entity.User;
import com.LMS.backend.entity.Wishlist;
import com.LMS.backend.repository.BookRepository;
import com.LMS.backend.repository.UserRepository;
import com.LMS.backend.repository.WishlistRepository;
import com.LMS.backend.service.WishlistService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Override
    public void addToWishlist(
            Long userId,
            Long bookId
    ) {

        boolean exists =
                wishlistRepository
                        .existsByUser_IdAndBook_Id(
                                userId,
                                bookId
                        );

        // Already in wishlist
        if (exists) {
            return;
        }

        User user =
                userRepository.findById(userId)
                        .orElseThrow(
                                () -> new RuntimeException("User not found")
                        );

        Book book =
                bookRepository.findById(bookId)
                        .orElseThrow(
                                () -> new RuntimeException("Book not found")
                        );

        Wishlist wishlist =
                Wishlist.builder()
                        .user(user)
                        .book(book)
                        .createdAt(LocalDateTime.now())
                        .build();

        wishlistRepository.save(wishlist);
    }

    @Override
    public List<Wishlist> getWishlist(
            Long userId
    ) {

        return wishlistRepository.findByUser_Id(
                userId
        );
    }

    @Override
    public void removeFromWishlist(
            Long userId,
            Long bookId
    ) {

        wishlistRepository.deleteByUser_IdAndBook_Id(
                userId,
                bookId
        );
    }
}