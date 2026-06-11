package com.LMS.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {

    private Long totalBooks;

    private Long totalUsers;

    private Long totalBorrowedBooks;

    private Long overdueBooks;
}