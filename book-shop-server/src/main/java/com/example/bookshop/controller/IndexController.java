package com.example.bookshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {
/*
    @GetMapping("")
    public ModelAndView home() {
        ModelAndView mav = new ModelAndView("index");
        return mav;
    }*/

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @RequestMapping(value = "/{path:[^\\.]*}")
    public String forward() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/user/{path:[^\\.]*}")
    public String user() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/shop/{path:[^\\.]*}")
    public String shop() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/shop/detail/{path:[^\\.]*}")
    public String shopDetail() {
        return "forward:/index.html";
    }

}