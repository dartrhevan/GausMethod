package com.numericanalysis.numericanalysisbackend.controllers;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import com.google.gson.Gson;
import com.numericanalysis.numericanalysisbackend.model.Origin;
import com.numericanalysis.numericanalysisbackend.services.CommentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class SocketTextHandler extends TextWebSocketHandler {

    private final Map<WebSocketSession, Origin> sockets = new ConcurrentHashMap<>();
    private final Gson gson = new Gson();
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException, IllegalAccessException {
        /*session.sendMessage(new TextMessage("Hi " +  " how may we help you?"));*/
        Origin o = Origin.valueOf(message.getPayload());
        System.out.println(o);
        sockets.put(session, o);
        session.sendMessage(new TextMessage(gson.toJson(commentService.getComments(o))));
    }

    @Autowired
    private CommentServiceImpl commentService;// = CommentService.getInstance();
/*
    public SocketTextHandler() {

    }*/


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        //sockets.add(session);
        if(commentService.getOnCommentAdd() == null)
            commentService.setOnCommentAdd(ob -> {

               // System.out.println("oncommentadd");
            sockets.forEach((s,o) -> {
                System.out.println(s);
                try {
                    s.sendMessage(new TextMessage(gson.toJson(commentService.getComments(o))));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        });

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        sockets.remove(session);
    }
}