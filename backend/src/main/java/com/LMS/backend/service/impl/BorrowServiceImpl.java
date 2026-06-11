package com.LMS.backend.service.impl;

import com.LMS.backend.dto.BorrowRequest;
import com.LMS.backend.entity.Book;
import com.LMS.backend.entity.BorrowRecord;
import com.LMS.backend.entity.User;
import com.LMS.backend.exception.BadRequestException;
import com.LMS.backend.exception.ResourceNotFoundException;
import com.LMS.backend.repository.BookRepository;
import com.LMS.backend.repository.BorrowRecordRepository;
import com.LMS.backend.repository.UserRepository;
import com.LMS.backend.service.BorrowService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BorrowServiceImpl
        implements BorrowService {

    private final BorrowRecordRepository borrowRecordRepository;

    private final UserRepository userRepository;

    private final BookRepository bookRepository;

    @Override
    public BorrowRecord borrowBook(
            BorrowRequest request) {

        User user = userRepository.findById(
                        request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Book book = bookRepository.findById(
                        request.getBookId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Book not found"));

        if (book.getAvailableQuantity() <= 0) {

            throw new BadRequestException(
                    "Book not available");
        }

        book.setAvailableQuantity(
                book.getAvailableQuantity() - 1);

        bookRepository.save(book);

        BorrowRecord record =
                BorrowRecord.builder()
                        .user(user)
                        .book(book)
                        .borrowDate(LocalDate.now())
                        .dueDate(
                                LocalDate.now()
                                        .plusDays(15))
                        .fine(0.0)
                        .build();

        return borrowRecordRepository.save(record);
    }

    @Override
    public BorrowRecord returnBook(
            Long borrowId) {

        BorrowRecord record =
                borrowRecordRepository.findById(
                                borrowId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Borrow record not found"));

        if (record.getReturnDate() != null) {

            throw new BadRequestException(
                    "Book already returned");
        }

        record.setReturnDate(
                LocalDate.now());

        Book book = record.getBook();

        book.setAvailableQuantity(
                book.getAvailableQuantity() + 1);

        bookRepository.save(book);

        long lateDays =
                ChronoUnit.DAYS.between(
                        record.getDueDate(),
                        LocalDate.now());

        if (lateDays > 0) {

            record.setFine(
                    lateDays * 10.0);
        } else {

            record.setFine(0.0);
        }

        return borrowRecordRepository.save(record);
    }

    @Override
    public List<BorrowRecord>
    getAllBorrowRecords() {

        return borrowRecordRepository.findAll();
    }

    @Override
    public List<BorrowRecord>
    getBorrowHistoryByUser(
            Long userId) {

        userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        return borrowRecordRepository
                .findByUserId(userId);
    }

    @Override
    public List<BorrowRecord>
    getOverdueBooks() {

        return borrowRecordRepository
                .findByReturnDateIsNull()
                .stream()
                .filter(record ->
                        record.getDueDate()
                                .isBefore(
                                        LocalDate.now()))
                .toList();
    }
}