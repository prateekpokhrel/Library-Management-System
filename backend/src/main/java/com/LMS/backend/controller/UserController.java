package com.LMS.backend.controller;

import com.LMS.backend.entity.User;
import com.LMS.backend.service.UserService;
import com.LMS.backend.dto.UserDashboardResponse; // Added import for the DTO

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/dashboard/{userId}")
    public UserDashboardResponse getDashboard(@PathVariable Long userId) {
        return userService.getDashboard(userId);
    }
}