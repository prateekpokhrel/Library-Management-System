package com.LMS.backend.service;

import com.LMS.backend.dto.PublisherRequest;
import com.LMS.backend.entity.Publisher;

import java.util.List;

public interface PublisherService {

    Publisher addPublisher(PublisherRequest request);

    List<Publisher> getAllPublishers();

    Publisher getPublisherById(Long id);

    Publisher updatePublisher(
            Long id,
            PublisherRequest request
    );

    void deletePublisher(Long id);
}