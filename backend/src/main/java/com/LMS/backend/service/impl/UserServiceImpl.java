package com.LMS.backend.service.impl;

import com.LMS.backend.entity.Book;
import com.LMS.backend.entity.User;
import com.LMS.backend.dto.UserDashboardResponse;
import com.LMS.backend.exception.ResourceNotFoundException;
import com.LMS.backend.repository.BookRepository;
import com.LMS.backend.repository.BorrowRecordRepository;
import com.LMS.backend.repository.UserRepository;
import com.LMS.backend.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final BorrowRecordRepository borrowRecordRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found");
        }

        userRepository.deleteById(id);
    }

    @Override
    public UserDashboardResponse getDashboard(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        long borrowedBooks = borrowRecordRepository.findByUserId(userId)
                .stream()
                .filter(r -> r.getReturnDate() == null)
                .count();

        long overdueBooks = borrowRecordRepository.findByUserId(userId)
                .stream()
                .filter(r -> r.getReturnDate() == null && r.getDueDate().isBefore(LocalDate.now()))
                .count();

        long totalBooks = bookRepository.count();

        long availableBooks = bookRepository.findAll()
                .stream()
                .mapToLong(Book::getAvailableQuantity)
                .sum();

        return UserDashboardResponse.builder()
                .fullName(user.getFullName())
                .email(user.getEmail())
                .borrowedBooks(borrowedBooks)
                .overdueBooks(overdueBooks)
                .availableBooks(availableBooks)
                .totalBooks(totalBooks)
                .build();
    }
}