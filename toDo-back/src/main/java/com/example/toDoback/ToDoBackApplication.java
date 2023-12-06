package com.example.toDoback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@ComponentScan
public class ToDoBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToDoBackApplication.class, args);
		System.out.println("Hello!");
	}

}
