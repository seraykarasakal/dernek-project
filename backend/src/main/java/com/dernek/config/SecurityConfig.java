package com.dernek.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() //  Tüm isteklere izin ver
            )
            .csrf(csrf -> csrf.disable()) //  CSRF korumasını devre dışı bırak
            .headers(headers -> headers.frameOptions(frame -> frame.disable())); // H2 Console gibi şeyler için gerekli olabilir

        return http.build();
    }
}
