package com.botanical_garden_server.botanical.garden.server.Controller;

import com.botanical_garden_server.botanical.garden.server.Model.User;
import com.botanical_garden_server.botanical.garden.server.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/getCredentials")
    @ResponseBody
    public User getUserCredentials(@RequestParam String name, @RequestParam String password){
        return this.userService.getUserCredentials(name, password);
    }
}
