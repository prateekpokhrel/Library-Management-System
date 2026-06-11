package com.LMS.backend.dto;

import com.LMS.backend.entity.Book;
import com.LMS.backend.entity.BorrowRecord;
import lombok.*;
import java.util.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDashboardResponse {

    private String fullName;

    private String email;

    private long borrowedBooks;

    private long overdueBooks;

    private long availableBooks;

    private long totalBooks;

    private List<Book> recentBooks;

    private List<Book> recommendedBooks;

    private List<Book> wishlistBooks;

    private List<BorrowRecord> activeBorrows;
}