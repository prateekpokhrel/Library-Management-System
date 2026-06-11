package com.LMS.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String fullName;

    private String email;

    private String phone;

    private String location;

    private String password;
}