package com.LMS.backend.service.impl;

import com.LMS.backend.dto.BookRequest;
import com.LMS.backend.entity.*;
import com.LMS.backend.exception.ResourceNotFoundException;
import com.LMS.backend.repository.*;
import com.LMS.backend.service.BookService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CategoryRepository categoryRepository;
    private final PublisherRepository publisherRepository;

    @Override
    @Transactional
    public Book addBook(
            String title,
            String isbn,
            Integer quantity,
            Long authorId,
            Long categoryId,
            Long publisherId,
            MultipartFile coverImage
    ) {

        Author author = authorRepository.findById(authorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Author not found"));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        Publisher publisher = publisherRepository.findById(publisherId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Publisher not found"));

        String imageName = null;

        try {

            if (coverImage != null && !coverImage.isEmpty()) {

                String fileName =
                        UUID.randomUUID() + "_" +
                                coverImage.getOriginalFilename();

                Path uploadPath = Paths.get("uploads");

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Files.copy(
                        coverImage.getInputStream(),
                        uploadPath.resolve(fileName),
                        StandardCopyOption.REPLACE_EXISTING
                );

                imageName = fileName;
            }

        } catch (Exception e) {
            throw new RuntimeException("Image upload failed");
        }

        Book book = Book.builder()
                .title(title)
                .isbn(isbn)
                .quantity(quantity)
                .availableQuantity(quantity)
                .coverImage(imageName)
                .author(author)
                .category(category)
                .publisher(publisher)
                .build();

        return bookRepository.save(book);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Book> getAllBooks() {

        return bookRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Book getBookById(Long id) {

        return bookRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Book not found with id: " + id));
    }

    @Override
    @Transactional
    public Book updateBook(
            Long id,
            BookRequest request) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Book not found with id: " + id));

        Author author = authorRepository.findById(
                        request.getAuthorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Author not found"));

        Category category = categoryRepository.findById(
                        request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found"));

        Publisher publisher = publisherRepository.findById(
                        request.getPublisherId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Publisher not found"));

        book.setTitle(request.getTitle());
        book.setIsbn(request.getIsbn());
        book.setQuantity(request.getQuantity());

        book.setAuthor(author);
        book.setCategory(category);
        book.setPublisher(publisher);

        return bookRepository.save(book);
    }

    @Override
    @Transactional
    public void deleteBook(Long id) {

        if (!bookRepository.existsById(id)) {

            throw new ResourceNotFoundException(
                    "Book not found with id: " + id);
        }

        bookRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Book> searchBooks(
            String keyword) {

        return bookRepository
                .findByTitleContainingIgnoreCase(keyword);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Book> getBooksPaged(
            int page,
            int size,
            String sortBy) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(sortBy));

        return bookRepository.findAll(pageable);
    }
}