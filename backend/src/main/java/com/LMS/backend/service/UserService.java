package com.LMS.backend.service;

import com.LMS.backend.entity.User;
import com.LMS.backend.dto.UserDashboardResponse; // Added import for the DTO

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User getUserById(Long id);

    void deleteUser(Long id);

    UserDashboardResponse getDashboard(Long userId);
}