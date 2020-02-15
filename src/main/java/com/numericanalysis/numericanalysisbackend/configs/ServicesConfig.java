package com.numericanalysis.numericanalysisbackend.configs;

import com.numericanalysis.numericanalysisbackend.services.CommentServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServicesConfig {
    @Bean
    public CommentServiceImpl getCommentServiceImpl() {
        return CommentServiceImpl.getInstance();
    }
}
