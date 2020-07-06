package com.numericalanalysis.numericalalanalysisbackend.services;

import com.numericalanalysis.numericalalanalysisbackend.model.Comment;
import com.numericalanalysis.numericalalanalysisbackend.model.CommentMessage;
import com.numericalanalysis.numericalalanalysisbackend.model.Origin;
import com.numericalanalysis.numericalalanalysisbackend.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Primary
@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    private CommentRepository commentRepository;

    @Override
    public Collection<CommentMessage> getComments(Origin origin){
        return commentRepository.findByOrigin(origin).parallelStream().map(CommentMessage::new)
                .collect( Collectors.toList());
    }

    @Override
    public void addComment(Comment comment) {
        commentRepository.save(comment);
    }

    @Transactional
    @Override
    public void addComment(Comment comment,int parentId) {
        Comment parent = commentRepository.getOne(parentId);
        comment.setParent(parent);
        comment.setNesting(parent.getNesting() + 1);
        parent.getReplies().add(comment);
        commentRepository.saveAndFlush(comment);
    }
}
