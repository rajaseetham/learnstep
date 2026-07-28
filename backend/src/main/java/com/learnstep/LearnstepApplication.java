package com.learnstep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LearnstepApplication {

	public static void main(String[] args) {
		SpringApplication.run(LearnstepApplication.class, args);
		System.out.println("🚀 LearnStep Spring Boot Backend is running on port 8080!");
	}

}
