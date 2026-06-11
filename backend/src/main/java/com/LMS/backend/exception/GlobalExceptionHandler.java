package com.LMS.backend.exception;

import com.LMS.backend.dto.ApiErrorResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
            ResourceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse>
    handleNotFound(
            ResourceNotFoundException ex) {

        return ResponseEntity.status(
                        HttpStatus.NOT_FOUND)
                .body(
                        new ApiErrorResponse(
                                LocalDateTime.now(),
                                404,
                                "NOT_FOUND",
                                ex.getMessage()
                        )
                );
    }

    @ExceptionHandler(
            BadRequestException.class)
    public ResponseEntity<ApiErrorResponse>
    handleBadRequest(
            BadRequestException ex) {

        return ResponseEntity.badRequest()
                .body(
                        new ApiErrorResponse(
                                LocalDateTime.now(),
                                400,
                                "BAD_REQUEST",
                                ex.getMessage()
                        )
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse>
    handleGeneric(
            Exception ex) {

        return ResponseEntity.status(
                        HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        new ApiErrorResponse(
                                LocalDateTime.now(),
                                500,
                                "INTERNAL_SERVER_ERROR",
                                ex.getMessage()
                        )
                );
    }
}