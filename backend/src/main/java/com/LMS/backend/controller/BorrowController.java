package com.LMS.backend.controller;

import com.LMS.backend.dto.BorrowRequest;
import com.LMS.backend.entity.BorrowRecord;
import com.LMS.backend.service.BorrowService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrow")
@RequiredArgsConstructor
public class BorrowController {

    private final BorrowService borrowService;

    @PostMapping
    public BorrowRecord borrowBook(
            @RequestBody BorrowRequest request) {

        return borrowService.borrowBook(
                request);
    }

    @PutMapping("/return/{borrowId}")
    public BorrowRecord returnBook(
            @PathVariable Long borrowId) {

        return borrowService.returnBook(
                borrowId);
    }

    @GetMapping
    public List<BorrowRecord>
    getAllBorrowRecords() {

        return borrowService
                .getAllBorrowRecords();
    }

    @GetMapping("/history/{userId}")
    public List<BorrowRecord>
    getUserHistory(
            @PathVariable Long userId) {

        return borrowService
                .getBorrowHistoryByUser(
                        userId);
    }

    @GetMapping("/overdue")
    public List<BorrowRecord>
    getOverdueBooks() {

        return borrowService
                .getOverdueBooks();
    }
}