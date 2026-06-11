package com.LMS.backend.controller;

import com.LMS.backend.entity.Wishlist;
import com.LMS.backend.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
@CrossOrigin("*")
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/{userId}/{bookId}")
    public void addToWishlist(
            @PathVariable Long userId,
            @PathVariable Long bookId
    ) {

        wishlistService.addToWishlist(
                userId,
                bookId
        );
    }

    @GetMapping("/{userId}")
    public List<Wishlist> getWishlist(
            @PathVariable Long userId
    ) {

        return wishlistService.getWishlist(
                userId
        );
    }

    @DeleteMapping("/{userId}/{bookId}")
    public void removeWishlist(
            @PathVariable Long userId,
            @PathVariable Long bookId
    ) {

        wishlistService.removeFromWishlist(
                userId,
                bookId
        );
    }
}