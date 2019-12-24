package com.numericanalysis.numericanalysisbackend.controllers;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @RequestMapping(value = {"/test"},method = RequestMethod.GET)
    public String index(Model m) {
        return "OK!";
    }
/*
    @RequestMapping(value = {"/login"})
    public String login(Model m){
        return "login";
    }
 */
}
