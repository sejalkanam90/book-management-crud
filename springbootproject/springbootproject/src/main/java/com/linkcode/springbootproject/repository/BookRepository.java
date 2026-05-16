package com.linkcode.springbootproject.repository;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

import com.linkcode.springbootproject.entity.Book;

@Repository
public interface  BookRepository extends CrudRepository<Book,Integer> {

}
