package com.joy.holin.config;

import com.joy.holin.repo.MemberRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                                .cors(Customizer.withDefaults()) // 啟用 CORS
                                .csrf(csrf -> csrf.disable()) // Disable CSRF for API usage
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/api/customer/forgot-password").permitAll() // 忘記密碼/重設密碼都用他
                                                .requestMatchers("/api/customer/register").permitAll() // 開放註冊
                                                .requestMatchers("/api/customer/login").permitAll() // 開放客戶登入 API
                                                .requestMatchers("/api/customer/verify-reset-token").permitAll()
                                                .requestMatchers("/api/customer/reset-password").permitAll()
                                                .requestMatchers("/api/products/**").permitAll()
                                                .requestMatchers("/api/checkout/**").permitAll()
                                                .requestMatchers("/api/payment/form/**").permitAll()
                                                .requestMatchers("/api/orders/**").hasRole("CUSTOMER")
                                                .requestMatchers("/api/customer/**").hasRole("CUSTOMER")
                                                .anyRequest().permitAll());
                // .httpBasic(Customizer.withDefaults()); // 可以移除 Basic Auth，改用 JWT

                http.addFilterBefore(new com.joy.holin.filter.JwtFilter(),
                                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}
