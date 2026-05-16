package com.linkcode.springbootproject;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.linkcode.springbootproject")
@EntityScan(basePackages = "com.linkcode.springbootproject.entity")
@EnableJpaRepositories(basePackages = "com.linkcode.springbootproject.repository")


public class SpringbootprojectApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootprojectApplication.class, args);
    }
}
