package com.numericalanalysis.numericalalanalysisbackend.configs;

import javax.sql.DataSource;

import com.numericalanalysis.numericalalanalysisbackend.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;/*
import org.springframework.security.web.authentication.rememberme.InMemoryTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;*/
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * A configuration of Spring Security used for authorization
 * @author dartrhevan
 */

@EnableCaching(proxyTargetClass=true)
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final DataSource dataSource;

    private final BCryptPasswordEncoder encoder;

    public static final String REGISTRATION_URL = "/j_spring_security_check";

    private final UserDetailsServiceImpl userDetailsService;

    @Autowired
    public SecurityConfig(DataSource dataSource, BCryptPasswordEncoder encoder, UserDetailsServiceImpl userDetailsService) {
        this.dataSource = dataSource;
        this.encoder = encoder;
        this.userDetailsService = userDetailsService;
    }

    // регистрируем нашу реализацию UserDetailsService
    // а также PasswordEncoder для приведения пароля в формат SHA1
    @Autowired
    public void registerGlobalAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder( encoder );
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.authorizeRequests()
                //.anyRequest()
                .antMatchers( "/", "equations", "/img/*", "/comments", "/drop_password", "systems",
                        "interpolation", "interpolation.html", "login", "/api/get_user_name", "/api/get_photo", "/favicon.ico", "/logo192.png" )
                .permitAll();//.authenticated()
                //.and().httpBasic();
        http.headers().frameOptions().sameOrigin().and();
        http.authorizeRequests()
                .antMatchers("/api/get_user_data", "/api/reply_comment", "/user-information", "/api/edit_user_data").authenticated()
                .and().httpBasic();

        http.csrf().disable();
        http.formLogin()
                .loginPage("/login")
                .loginProcessingUrl(REGISTRATION_URL)
                .usernameParameter("email")
                .passwordParameter("password")
                .permitAll();
        http.logout()
                // разрешаем делать логаут всем
                .permitAll()
                // указываем URL логаута
                .logoutUrl("/logout")
                // указываем URL при удачном логауте
                .logoutSuccessUrl("/login?logout")
                // делаем не валидной текущую сессию
                .invalidateHttpSession(true);



        http.rememberMe().key("uniqueAndSecret").tokenRepository(persistentTokenRepository());
    }

    /**
     * Initialize if needed and retrieve a token repository for <i>remember me</i> function
     * @return token repository
     */
    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        final JdbcTokenRepositoryImpl impl = new JdbcTokenRepositoryImpl();
        impl.setDataSource(dataSource);
        impl.getJdbcTemplate().execute("create table if not exists persistent_logins(" +
                " username varchar(50) not null," +
                " series varchar(64) primary key," +
                " token varchar(64) not null," +
                " last_used timestamp not null" +
                " );");
        return impl;
    }
}