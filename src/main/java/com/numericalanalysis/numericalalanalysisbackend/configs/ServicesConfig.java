package com.numericalanalysis.numericalalanalysisbackend.configs;

import com.numericalanalysis.numericalalanalysisbackend.services.CommentServiceImpl;
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
