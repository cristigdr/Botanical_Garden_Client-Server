package com.botanical_garden_server.botanical.garden.server.Service;

import com.botanical_garden_server.botanical.garden.server.Model.User;
import com.botanical_garden_server.botanical.garden.server.Repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private IUserRepository userRepo;

    public List<User> getUsers(){
        return(List<User>) this.userRepo.findAll();
    }

    public Optional<User> getUserById(Long id){
        return this.userRepo.findById(id);
    }

    public User insertUser(User user){
        return this.userRepo.save(user);
    }

    public User updateUser(User updatedUser) {
        User existingUser = userRepo.findById(updatedUser.getId()).orElse(null);

        if (existingUser != null) {
            existingUser.setUser(updatedUser.getUser());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setRole(updatedUser.getRole());
            return userRepo.save(existingUser);
        }
        return null;
    }

    public String deleteUser(Long id){
        try{
            this.userRepo.deleteById(id);
            return "Deletion Successfully";
        }catch (Exception e){
            return "Failed o delete user with id" + id;
        }
    }

    public User getUserCredentials(String name, String password){
        return this.userRepo.findByUserAndPassword(name, password);
    }

    public List<User> findUsersByRole(String role){
        return this.userRepo.findByRole(role);
    }


}
