package com.linkcode.springbootproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.linkcode.springbootproject.entity.Book;
import com.linkcode.springbootproject.service.BookService;

@RestController
@RequestMapping("/book")

@CrossOrigin(origins="http://localhost:5173")
public class BookControlller {

	@Autowired
	private BookService service;

	// 1. Test API

	@GetMapping
	public String booktest() {
		return "Book API is working";
	}

	// 2. Add Book

	@PostMapping
	public String addbook(@RequestBody Book book) {
		service.savebook(book);
		return "Book added successfully";
	}

	// 3. Get All Books

	@GetMapping("/getbooks")
	public List<Book> getAllBooks() {
		return service.getAllBooks();
	}

	// 4. Get Book by ID

	@GetMapping("/{bookid}")
	public Book getBook(@PathVariable("bookid") int id) {
		return service.getBook(id);
	}

	// 5. Delete Book

	@DeleteMapping("/delete/{bookid}")
	public String deleteBook(@PathVariable("bookid") int id) {
		service.deleteBook(id);
		return "Book deleted successfully";
	}

	// 6. Update Book

	@PutMapping("/updatebook")
	public String updateBook(@RequestBody Book book) {
		 service.updateBook(book);
		 return "Book Updated Successfully";

	}
}