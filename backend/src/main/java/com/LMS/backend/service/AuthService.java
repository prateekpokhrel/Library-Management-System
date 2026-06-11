package com.LMS.backend.service;

import com.LMS.backend.dto.AuthResponse;
import com.LMS.backend.dto.LoginRequest;
import com.LMS.backend.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}