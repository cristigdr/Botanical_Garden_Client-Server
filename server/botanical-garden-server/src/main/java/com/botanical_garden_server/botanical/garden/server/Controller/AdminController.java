package com.botanical_garden_server.botanical.garden.server.Controller;

import com.botanical_garden_server.botanical.garden.server.Model.User;
import com.botanical_garden_server.botanical.garden.server.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/getUsers")
    @ResponseBody
    public List<User> getAllUsers(){
        return this.userService.getUsers();
    }

    @PostMapping("/insertUser")
    @ResponseBody
    public User insertUser(@RequestBody User user){
        return this.userService.insertUser(user);
    }

    
}
