package com.numericalanalysis.numericalalanalysisbackend.repositories;

import com.numericalanalysis.numericalalanalysisbackend.model.Comment;
import com.numericalanalysis.numericalalanalysisbackend.model.Origin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query("SELECT C FROM comment C WHERE C.origin = ?1 AND C.nesting = 0")
    Collection<Comment> findByOrigin(@Param("origin") Origin origin);
}
