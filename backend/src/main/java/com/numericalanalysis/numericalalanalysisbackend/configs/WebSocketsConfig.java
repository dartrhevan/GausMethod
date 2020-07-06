package com.numericalanalysis.numericalalanalysisbackend.configs;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;
import javax.servlet.Filter;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketsConfig extends AbstractWebSocketMessageBrokerConfigurer
{
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/client");
        config.setApplicationDestinationPrefixes("/ws-api");
    }

    /**
     * Binds Principal object to request and allows injection of @AuthenticationPrincipal, Authentication and Principal objects into controller params.
     */
    @Bean
    public SecurityContextHolderAwareRequestFilter securityContextHolderAwareRequestFilter() {
        return new SecurityContextHolderAwareRequestFilter();
    }

    @Bean
    public FilterRegistrationBean deactivateSecurityContextHolderAwareRequestFilter(@Qualifier("securityContextHolderAwareRequestFilter") SecurityContextHolderAwareRequestFilter filter) {
        return deactivate(filter);
    }

    private FilterRegistrationBean deactivate(Filter filter) {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean<>(filter);
        registrationBean.setEnabled(false);
        // container shouldn't register this filter under its ApplicationContext as this filter already registered within springSecurityFilterChain as bean
        return registrationBean;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("http://localhost:3000").withSockJS();
    }
}