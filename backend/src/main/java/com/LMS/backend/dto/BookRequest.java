package com.LMS.backend.dto;

import lombok.Data;

@Data
public class BookRequest {

    private String title;
    private String isbn;
    private Integer quantity;
    private String coverImage;
    private String pdfFile;

    private Long authorId;
    private Long categoryId;
    private Long publisherId;
}