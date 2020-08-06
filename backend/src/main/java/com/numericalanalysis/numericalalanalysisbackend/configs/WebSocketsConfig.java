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

/**
 * Websockets configuration
 * @author dartrhevan
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketsConfig extends AbstractWebSocketMessageBrokerConfigurer
{
    /**
     * Register prefixes for clients to subscribe and send respectively
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/client");//prefix of client subscription and "SendTo"
        config.setApplicationDestinationPrefixes("/ws-api");//prefix of controller's endpoints
    }

    /**
     * Binds Principal object to request and allows injection of @AuthenticationPrincipal, Authentication and Principal objects into controller params.
     */
    @Bean
    public SecurityContextHolderAwareRequestFilter securityContextHolderAwareRequestFilter() {
        return new SecurityContextHolderAwareRequestFilter();
    }

    /**
     * Required for correct passing of authorization data
     */
    @Bean
    public FilterRegistrationBean deactivateSecurityContextHolderAwareRequestFilter(
            @Qualifier("securityContextHolderAwareRequestFilter") SecurityContextHolderAwareRequestFilter filter) {
        return deactivate(filter);
    }

    private FilterRegistrationBean deactivate(Filter filter) {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean<>(filter);
        registrationBean.setEnabled(false);
        // container shouldn't register this filter under its ApplicationContext as this filter already registered within springSecurityFilterChain as bean
        return registrationBean;
    }

    /**
     * Register websocket endpoint for clients to connect
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("http://localhost:3000").withSockJS();
    }
}