package com.numericanalysis.numericanalysisbackend.controllers;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {


    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public String greeting(String message) throws Exception {
        //Thread.sleep(1000); // simulated delay
        System.out.println(message);
        return "asdffa";//new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }

}