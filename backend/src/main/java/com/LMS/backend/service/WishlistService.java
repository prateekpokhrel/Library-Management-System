package com.LMS.backend.service;

import com.LMS.backend.entity.Wishlist;

import java.util.List;

public interface WishlistService {

    void addToWishlist(
            Long userId,
            Long bookId
    );

    List<Wishlist> getWishlist(
            Long userId
    );

    void removeFromWishlist(
            Long userId,
            Long bookId
    );
}