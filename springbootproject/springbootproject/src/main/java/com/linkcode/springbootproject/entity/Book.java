package com.linkcode.springbootproject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

@Entity
@Data
public class Book {

    @Id
   
    private int id;
    private String name;
    private String author;
    private double price;
}