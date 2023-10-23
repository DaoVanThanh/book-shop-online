package com.example.bookshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BookshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookshopApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:3000")
						.allowedMethods("GET", "POST", "PUT", "DELETE")
						.allowCredentials(true); // Cho phép sử dụng các thông tin xác thực (cookies, headers)
			}
		};
	}
}