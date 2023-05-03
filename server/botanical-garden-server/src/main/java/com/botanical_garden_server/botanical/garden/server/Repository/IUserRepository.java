package com.botanical_garden_server.botanical.garden.server.Repository;

import com.botanical_garden_server.botanical.garden.server.Model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends CrudRepository<User, Long> {
    User findByUserAndPassword(String name, String password);
    User findByRole(String role);
}
