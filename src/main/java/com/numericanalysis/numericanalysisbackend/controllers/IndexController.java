package com.numericanalysis.numericanalysisbackend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class IndexController {/*
    @RequestMapping(value = {"/test"},method = RequestMethod.GET)
    public String test(Model m) {
        return "OK!";
    }
*/
    @RequestMapping(value = {"/", "es", "sle", "interpolation"},method = RequestMethod.GET)
    public String index(Model m) {
        return "forward:/index.html";
    }

/*
    @RequestMapping(value = {"/interpolation.html"},method = RequestMethod.GET)
    public String interpol(Model m) {
        return "forward:/interpolation.html";
    }*/
}
