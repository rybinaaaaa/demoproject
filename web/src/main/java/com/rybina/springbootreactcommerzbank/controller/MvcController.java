package com.rybina.springbootreactcommerzbank.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MvcController {

    @RequestMapping(value = "/{path:[^.]*}")
    public String redirect() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/**/{subpath:[^.]*}")
    public String redirectSubPathes() {
        return "forward:/index.html";
    }
}
