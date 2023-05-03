package com.botanical_garden_server.botanical.garden.server.Model;


import jakarta.persistence.*;
import org.hibernate.annotations.Check;


@Entity
@Table(name = "plants")
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "denumire", nullable = false, unique = true, length = 50)
    private String name;
    @Column(name = "tip", nullable = false, length = 50)
    private String type;
    @Column(name = "specie", nullable = false, length = 100)
    private String species;
    @Column(name = "planta_carnivora", nullable = false, columnDefinition = "CHAR(3)")
    private String carnivorous;
    @Column(name = "zona_gradina_botanica", nullable = false, columnDefinition = "CHAR(1)")
    @Check(constraints = "zona_gradina_botanica IN ('A', 'B', 'C', 'D')")
    private String zone;


    public Plant() {}

    public Plant(String name, String type, String species, String carnivorous, String zone) {
        this.name = name;
        this.type = type;
        this.species = species;
        this.carnivorous = carnivorous;
        this.zone = zone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getCarnivorous() {
        return carnivorous;
    }

    public void setCarnivorous(String carnivorous) {
        this.carnivorous = carnivorous;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Plant plant = (Plant) o;

        if (!name.equals(plant.name)) return false;
        if (!type.equals(plant.type)) return false;
        if (!species.equals(plant.species)) return false;
        if (!carnivorous.equals(plant.carnivorous)) return false;
        return zone.equals(plant.zone);
    }

}