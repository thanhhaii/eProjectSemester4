package com.eproject.backend.configurations;

import com.eproject.backend.common.ERole;
import com.eproject.backend.filters.CustomAuthenticationFilter;
import com.eproject.backend.filters.CustomAuthorizationFilter;
import com.eproject.backend.services.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserServiceImpl UserServiceImpl;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(UserServiceImpl).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/auth/login");
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers(POST,"/users").permitAll()
                .antMatchers("/users/reset-password").permitAll()
                .antMatchers("/auth/login", "/auth/refresh-token").permitAll()
                .antMatchers(PUT,"/users").hasAnyAuthority(ERole.ROLE_USER.toString())
                .antMatchers(GET,"/users/me").hasAnyAuthority(ERole.ROLE_USER.toString())
                .antMatchers("/users/verify-email").hasAnyAuthority(ERole.ROLE_USER.toString());

        http.authorizeRequests().antMatchers(GET,"/categories").permitAll()
                .antMatchers(POST,"/categories").hasAnyAuthority(ERole.ROLE_ADMIN.toString())
                .antMatchers(PUT,"/categories").hasAnyAuthority(ERole.ROLE_ADMIN.toString())
                .antMatchers(DELETE,"/categories/{id}").hasAnyAuthority(ERole.ROLE_ADMIN.toString());

        http.authorizeRequests().antMatchers(POST, "/api/user/save/**").hasAnyAuthority(ERole.ROLE_ADMIN.toString());
        http.authorizeRequests().antMatchers("/api/image/upload").permitAll();
        http.authorizeRequests().anyRequest().authenticated();

        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
