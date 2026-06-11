package com.LMS.backend.repository;

import com.LMS.backend.entity.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowRecordRepository
        extends JpaRepository<BorrowRecord, Long> {

    List<BorrowRecord> findByUserId(
            Long userId);

    List<BorrowRecord>
    findByReturnDateIsNull();
}