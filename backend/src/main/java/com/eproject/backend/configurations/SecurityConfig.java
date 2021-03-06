package com.eproject.backend.configurations;

import com.eproject.backend.common.ERole;
import com.eproject.backend.filters.CustomAuthenticationFilter;
import com.eproject.backend.filters.CustomAuthorizationFilter;
import com.eproject.backend.services.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserServiceImpl UserServiceImpl;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(UserServiceImpl).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/auth/login");
        http.csrf().disable();
        http.cors();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers(POST, "/users/register").permitAll()
                .antMatchers("/users/reset-password", "/auth/refresh-token").permitAll()
                .antMatchers(PUT, "/users").hasAnyAuthority(ERole.ROLE_USER.toString())
                .antMatchers(PUT, "/users/update-profile").hasAnyAuthority(ERole.ROLE_USER.toString(), ERole.ROLE_ADMIN.toString(), ERole.ROLE_MOD.toString())
                .antMatchers(PUT, "/users/change-password").hasAnyAuthority(ERole.ROLE_USER.toString(), ERole.ROLE_ADMIN.toString(), ERole.ROLE_MOD.toString())
                .antMatchers(GET, "/users/me").hasAnyAuthority(ERole.ROLE_USER.toString(), ERole.ROLE_ADMIN.toString(), ERole.ROLE_MOD.toString())
                .antMatchers("/users/verify-email").hasAnyAuthority(ERole.ROLE_USER.toString(), ERole.ROLE_ADMIN.toString(), ERole.ROLE_MOD.toString());
        http.authorizeRequests().antMatchers(GET, "/categories/**").permitAll()
                .antMatchers(POST, "/categories").permitAll()
                .antMatchers(PUT, "/categories").permitAll()
                .antMatchers(DELETE, "/categories/{id}").hasAnyAuthority(ERole.ROLE_ADMIN.toString(), ERole.ROLE_MOD.toString())
                .antMatchers(POST, "/categories/add-category-image").hasAnyAuthority(ERole.ROLE_USER.toString(), ERole.ROLE_ADMIN.toString(), ERole.ROLE_MOD.toString());

        http.authorizeRequests().antMatchers(POST, "/api/user/save/**").hasAnyAuthority(ERole.ROLE_ADMIN.toString());
        http.authorizeRequests().antMatchers(POST, "/images/upload")
                .hasAnyAuthority(ERole.ROLE_USER.toString(), ERole.ROLE_ADMIN.toString(), ERole.ROLE_MOD.toString())
                .antMatchers(GET, "/images").permitAll()
                .antMatchers(DELETE, "/images/{id}")
                .hasAnyAuthority(ERole.ROLE_USER.toString(), ERole.ROLE_MOD.toString(), ERole.ROLE_ADMIN.toString())
                .antMatchers(PUT, "images/update-info/{id}")
                .hasAnyAuthority(ERole.ROLE_USER.toString(), ERole.ROLE_MOD.toString(), ERole.ROLE_ADMIN.toString())
                .antMatchers(GET, "/images/my-image")
                .hasAnyAuthority(ERole.ROLE_USER.toString(), ERole.ROLE_MOD.toString(), ERole.ROLE_ADMIN.toString());

        http.authorizeRequests().antMatchers("/collections")
                .hasAnyAuthority(ERole.ROLE_USER.toString(), ERole.ROLE_ADMIN.toString(), ERole.ROLE_MOD.toString())
                .antMatchers("/collections**")
                .hasAnyAuthority(ERole.ROLE_USER.toString(), ERole.ROLE_ADMIN.toString(), ERole.ROLE_MOD.toString());

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

