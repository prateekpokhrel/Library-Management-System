package com.LMS.backend.service;

import com.LMS.backend.dto.BorrowRequest;
import com.LMS.backend.entity.BorrowRecord;

import java.util.List;

public interface BorrowService {

    BorrowRecord borrowBook(
            BorrowRequest request);

    BorrowRecord returnBook(
            Long borrowId);

    List<BorrowRecord> getAllBorrowRecords();

    List<BorrowRecord> getBorrowHistoryByUser(
            Long userId);

    List<BorrowRecord> getOverdueBooks();

}