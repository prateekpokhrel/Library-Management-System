package com.LMS.backend.controller;

import com.LMS.backend.dto.PublisherRequest;
import com.LMS.backend.entity.Publisher;
import com.LMS.backend.service.PublisherService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publishers")
@RequiredArgsConstructor
public class PublisherController {

    private final PublisherService publisherService;

    @PostMapping
    public Publisher addPublisher(
            @RequestBody PublisherRequest request) {

        return publisherService.addPublisher(request);
    }

    @GetMapping
    public List<Publisher> getAllPublishers() {

        return publisherService.getAllPublishers();
    }

    @GetMapping("/{id}")
    public Publisher getPublisherById(
            @PathVariable Long id) {

        return publisherService.getPublisherById(id);
    }

    @PutMapping("/{id}")
    public Publisher updatePublisher(
            @PathVariable Long id,
            @RequestBody PublisherRequest request) {

        return publisherService.updatePublisher(
                id,
                request);
    }

    @DeleteMapping("/{id}")
    public void deletePublisher(
            @PathVariable Long id) {

        publisherService.deletePublisher(id);
    }
}