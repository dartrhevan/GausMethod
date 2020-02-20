package com.numericanalysis.numericalanalysisbackend.configs;

import com.numericanalysis.numericalanalysisbackend.services.CommentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServicesConfig {
    @Autowired
    private CommentServiceImpl commentService;
    @Bean(name = "singleInst")
    public CommentServiceImpl getCommentServiceImpl() {
        return commentService;
    }
}
