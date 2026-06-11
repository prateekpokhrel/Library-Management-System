package com.LMS.backend.service.impl;

import com.LMS.backend.dto.PublisherRequest;
import com.LMS.backend.entity.Publisher;
import com.LMS.backend.exception.ResourceNotFoundException;
import com.LMS.backend.repository.PublisherRepository;
import com.LMS.backend.service.PublisherService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublisherServiceImpl
        implements PublisherService {

    private final PublisherRepository publisherRepository;

    @Override
    public Publisher addPublisher(
            PublisherRequest request) {

        Publisher publisher = Publisher.builder()
                .publisherName(
                        request.getPublisherName())
                .build();

        return publisherRepository.save(publisher);
    }

    @Override
    public List<Publisher> getAllPublishers() {

        return publisherRepository.findAll();
    }

    @Override
    public Publisher getPublisherById(Long id) {

        return publisherRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Publisher not found"));
    }

    @Override
    public Publisher updatePublisher(
            Long id,
            PublisherRequest request) {

        Publisher publisher =
                publisherRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Publisher not found"));

        publisher.setPublisherName(
                request.getPublisherName());

        return publisherRepository.save(publisher);
    }

    @Override
    public void deletePublisher(Long id) {

        publisherRepository.deleteById(id);
    }
}