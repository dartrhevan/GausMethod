package com.numericanalysis.numericanalysisbackend.services;

import com.numericanalysis.numericanalysisbackend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
