package dk.sogn.eksamen.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class InfectionController {

    @GetMapping("/")
    public String index(){
        return "index";
    }
}
