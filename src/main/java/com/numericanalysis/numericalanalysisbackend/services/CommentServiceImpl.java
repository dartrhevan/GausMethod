package com.numericanalysis.numericalanalysisbackend.services;

import com.numericanalysis.numericalanalysisbackend.model.Comment;
import com.numericanalysis.numericalanalysisbackend.model.CommentMessage;
import com.numericanalysis.numericalanalysisbackend.model.Origin;
import com.numericanalysis.numericalanalysisbackend.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.function.Consumer;
import java.util.stream.Collectors;
@Primary
@Service
public class CommentServiceImpl implements CommentService {
    //private static final CommentServiceImpl instance = new CommentServiceImpl();
    public CommentServiceImpl() {
        //System.out.println( "CommentServiceImpl" );
    }
    /*public static CommentServiceImpl getInstance() {
        return instance;
    }*/
    @Autowired
    private CommentRepository commentRepository;

    private Consumer onCommentAdd;

    public Consumer getOnCommentAdd() {
        return onCommentAdd;
    }

    public void setOnCommentAdd(Consumer onCommentAdd) {
        this.onCommentAdd = onCommentAdd;
    }

    @Override
    public Collection<CommentMessage> getComments(Origin origin){
        return commentRepository.findByOrigin(origin).parallelStream().map(CommentMessage::new)
                .collect( Collectors.toList());
    }

    @Override
    public void addComment(Comment comment) {
        commentRepository.save(comment);
        onCommentAdd.accept(null);
    }

    @Override
    public void addComment(Comment comment,int parentId) {
        Comment parent = commentRepository.getOne(parentId);
        comment.setParent(parent);
        comment.setNesting(parent.getNesting() + 1);
        parent.getReplies().add(comment);
        commentRepository.saveAndFlush(comment);
        onCommentAdd.accept(null);
    }
}
