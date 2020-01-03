package com.numericanalysis.numericanalysisbackend.services;

import com.numericanalysis.numericanalysisbackend.model.Comment;
import com.numericanalysis.numericanalysisbackend.model.CommentMessage;
import com.numericanalysis.numericanalysisbackend.model.Origin;
import com.numericanalysis.numericanalysisbackend.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;

import java.util.Collection;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private static final CommentService instance = new CommentService();
    private CommentService(){}
    public static CommentService getInstance() {
        return instance;
    }
    @Autowired
    private CommentRepository commentRepository;

    private Consumer onCommentAdd;

    public Consumer getOnCommentAdd() {
        return onCommentAdd;
    }

    public void setOnCommentAdd(Consumer onCommentAdd) {
        this.onCommentAdd = onCommentAdd;
    }

    public Collection<CommentMessage> getComments(Origin origin){
        return commentRepository.findByOrigin(origin).parallelStream().map(c -> new CommentMessage(c)).collect( Collectors.toList());
    }

    public void addComment(Comment comment) {
        commentRepository.save(comment);
        onCommentAdd.accept(null);
    }

}
