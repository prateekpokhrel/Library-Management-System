package com.LMS.backend.service.impl;

import com.LMS.backend.dto.DashboardResponse;
import com.LMS.backend.repository.BookRepository;
import com.LMS.backend.repository.BorrowRecordRepository;
import com.LMS.backend.repository.UserRepository;
import com.LMS.backend.service.DashboardService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {

    private final BookRepository bookRepository;

    private final UserRepository userRepository;

    private final BorrowRecordRepository borrowRecordRepository;

    @Override
    public DashboardResponse getDashboardData() {

        long totalBooks =
                bookRepository.count();

        long totalUsers =
                userRepository.count();

        long totalBorrowedBooks =
                borrowRecordRepository.count();

        long overdueBooks =
                borrowRecordRepository
                        .findByReturnDateIsNull()
                        .stream()
                        .filter(record ->
                                record.getDueDate()
                                        .isBefore(
                                                LocalDate.now()))
                        .count();

        return new DashboardResponse(
                totalBooks,
                totalUsers,
                totalBorrowedBooks,
                overdueBooks
        );
    }
}