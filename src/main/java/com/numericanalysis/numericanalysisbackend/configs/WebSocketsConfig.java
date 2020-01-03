package com.numericanalysis.numericanalysisbackend.configs;
import com.numericanalysis.numericanalysisbackend.controllers.SocketTextHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

@Configuration
@EnableWebSocket
public class WebSocketsConfig implements WebSocketConfigurer
{
    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxBinaryMessageBufferSize(1024000);
        return container;
    }

    @Bean
    public SocketTextHandler getSocketTextHandler() {
        return new SocketTextHandler();
    }

    @Autowired
    private SocketTextHandler socketTextHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(/*new SocketTextHandler()*/socketTextHandler, "/comments").setAllowedOrigins("*");
    }
}