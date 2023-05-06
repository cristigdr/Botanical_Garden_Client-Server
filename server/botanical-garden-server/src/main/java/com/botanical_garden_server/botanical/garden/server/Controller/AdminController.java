package com.botanical_garden_server.botanical.garden.server.Controller;

import com.botanical_garden_server.botanical.garden.server.Model.User;
import com.botanical_garden_server.botanical.garden.server.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/getUsers")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public List<User> getAllUsers(){
        return this.userService.getUsers();
    }

    @GetMapping("/getUser/{id}")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public Optional<User> getUser(@PathVariable("id") Long userId){
        return this.userService.getUserById(userId);
    }


    @PostMapping("/insertUser")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public User insertUser(@RequestBody User user){
        return this.userService.insertUser(user);
    }

    @PutMapping("/updateUser")
    @ResponseBody
    public User updateUser(@RequestBody User user){
        return this.userService.updateUser(user);
    }

    @DeleteMapping("/deleteUser")
    @ResponseBody
    public String deleteUser(@RequestParam Long id){
        return this.userService.deleteUser(id);
    }


    @GetMapping("/findRoles")
    @ResponseBody
    public List<User> findByRole(@RequestParam String role){
        return this.userService.findUsersByRole(role);
    }
}
