package com.LMS.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // 1. PUBLIC ENDPOINTS (No login required)
                        .requestMatchers(
                                "/uploads/**", // <-- Added uploads permission here
                                "/api/auth/**",
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // 2. ADMIN ONLY ENDPOINTS
                        .requestMatchers(
                                "/api/categories/**",
                                "/api/authors/**",
                                "/api/publishers/**",
                                "/api/dashboard/**"
                                // Removed /api/users/** from here!
                        ).hasAuthority("ADMIN")

                        // 3. ADMIN & USER ENDPOINTS
                        .requestMatchers(
                                "/api/books/**",
                                "/api/users/**", // <-- MOVED HERE! Now users can fetch/update their profiles
                                "/api/users/dashboard/**",
                                "/api/borrow/**"
                        ).hasAnyAuthority("ADMIN", "USER")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}