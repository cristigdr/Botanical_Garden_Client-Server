package com.botanical_garden_server.botanical.garden.server.Controller;

import com.botanical_garden_server.botanical.garden.server.Model.User;
import com.botanical_garden_server.botanical.garden.server.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/getCredentials")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public User getUserCredentials(@RequestParam String name, @RequestParam String password){
        return this.userService.getUserCredentials(name, password);
    }
}
