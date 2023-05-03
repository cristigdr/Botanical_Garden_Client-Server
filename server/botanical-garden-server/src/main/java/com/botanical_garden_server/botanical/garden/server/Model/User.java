package com.botanical_garden_server.botanical.garden.server.Model;


import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "utilizator", nullable = false, unique = true)
    private String user;
    @Column(name = "parola", nullable = false)
    private String password;
    @Column(name = "rol", nullable = false, columnDefinition = "VARCHAR(20)")
    private String role;


    public User() {}

    public User(String user, String password, String role) {
        this.user = user;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }


    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user1 = (User) o;

        if (!user.equals(user1.user)) return false;
        if (!password.equals(user1.password)) return false;
        return role.equals(user1.role);
    }

}