package com.numericanalysis.numericalanalysisbackend.services;

import com.numericanalysis.numericalanalysisbackend.model.Comment;
import com.numericanalysis.numericalanalysisbackend.model.CommentMessage;
import com.numericanalysis.numericalanalysisbackend.model.Origin;

import java.util.Collection;

public interface CommentService {
    Collection<CommentMessage> getComments(Origin origin);

    void addComment(Comment comment);

    void addComment(Comment comment,int parentId);
}
