package com.numericanalysis.numericanalysisbackend.services;

import com.numericanalysis.numericanalysisbackend.model.Comment;
import com.numericanalysis.numericanalysisbackend.model.CommentMessage;
import com.numericanalysis.numericanalysisbackend.model.Origin;

import java.util.Collection;

public interface CommentService {
    Collection<CommentMessage> getComments(Origin origin);

    void addComment(Comment comment);

    void addComment(Comment comment,int parentId);
}
