package com.linkcode.springbootproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.linkcode.springbootproject.entity.Book;
import com.linkcode.springbootproject.repository.BookRepository;

@Service
public class BookService {

	@Autowired
	private BookRepository repository;

	// 1. Save Book

	public Book savebook(Book book) {

		return repository.save(book);
	}

	// 2. Get All Books

	public List<Book> getAllBooks() {

		return (List<Book>) repository.findAll();
	}

	// 3. Get Book by ID

	public Book getBook(int id) {
		return repository.findById(id).get();
	}

	
	// 4. Delete book
	public void deleteBook(int id) {

		repository.deleteById(id);

	}

	// 5.Update Book
	public int updateBook(Book book) {
		repository.save(book);
		return book.getId();

	}

}