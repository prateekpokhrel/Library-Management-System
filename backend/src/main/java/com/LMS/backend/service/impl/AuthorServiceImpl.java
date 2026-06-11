package com.LMS.backend.service.impl;

import com.LMS.backend.dto.AuthorRequest;
import com.LMS.backend.entity.Author;
import com.LMS.backend.exception.ResourceNotFoundException;
import com.LMS.backend.repository.AuthorRepository;
import com.LMS.backend.service.AuthorService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;

    @Override
    @Transactional
    public Author addAuthor(AuthorRequest request) {
        Author author = Author.builder()
                .authorName(request.getAuthorName())
                .build();

        return authorRepository.save(author);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Author getAuthorById(Long id) {
        return authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Author not found with id: " + id));
    }

    @Override
    @Transactional
    public Author updateAuthor(Long id, AuthorRequest request) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Author not found with id: " + id));

        author.setAuthorName(request.getAuthorName());

        return authorRepository.save(author);
    }

    @Override
    @Transactional
    public void deleteAuthor(Long id) {
        if (!authorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Author not found with id: " + id);
        }
        authorRepository.deleteById(id);
    }
}