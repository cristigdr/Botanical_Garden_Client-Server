package com.botanical_garden_server.botanical.garden.server.Repository;

import com.botanical_garden_server.botanical.garden.server.Model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface IPlantRepository extends JpaRepository<Plant, Long> {

    @Query("SELECT p.carnivorous, COUNT(p) FROM Plant p GROUP BY p.carnivorous")
    List<Object[]> countByCarnivorous();

    @Query("SELECT p.zone, COUNT(p) FROM Plant p GROUP BY p.zone")
    List<Object[]> countByZone();

    List<Plant> findByOrderByTypeAscSpeciesAsc();

    default List<Plant> filterPlants(String criteria, String value) {
        List<Plant> allPlants = findAll();
        List<Plant> filteredPlants = new ArrayList<>();
        for (Plant plant : allPlants) {
            switch (criteria) {
                case "name" -> {
                    if (plant.getName().toLowerCase().contains(value.toLowerCase())) {
                        filteredPlants.add(plant);
                    }
                }
                case "type" -> {
                    if (plant.getType().toLowerCase().contains(value.toLowerCase())) {
                        filteredPlants.add(plant);
                    }
                }
                case "species" -> {
                    if (plant.getSpecies().toLowerCase().contains(value.toLowerCase())) {
                        filteredPlants.add(plant);
                    }
                }
                case "carnivorous" -> {
                    if (plant.getCarnivorous().toLowerCase().contains(value.toLowerCase())) {
                        filteredPlants.add(plant);
                    }
                }
                case "zone" -> {
                    if (plant.getZone().toLowerCase().contains(value.toLowerCase())) {
                        filteredPlants.add(plant);
                    }
                }
                default -> throw new IllegalArgumentException("Invalid criteria: " + criteria);
            }
        }
        return filteredPlants;
    }



}

