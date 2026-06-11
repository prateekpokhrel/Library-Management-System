package com.LMS.backend.dto;

import com.LMS.backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;

    private Long userId;

    private String fullName;

    private String email;

    private Role role;
}