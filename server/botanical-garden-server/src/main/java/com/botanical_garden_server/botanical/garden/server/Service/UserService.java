package com.botanical_garden_server.botanical.garden.server.Service;

import com.botanical_garden_server.botanical.garden.server.Model.User;
import com.botanical_garden_server.botanical.garden.server.Repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private IUserRepository userRepo;

    public List<User> getUsers(){
        return(List<User>) this.userRepo.findAll();
    }

    public User insertUser(User user){
        return this.userRepo.save(user);
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

    public List<User> findusersByRole(String role){
        return this.userRepo.findByRole(role);
    }

    public boolean checkIfUserExists(User user){
        return this.userRepo.existsByIdAndUserAndPasswordAndRole(user);
    }
}
