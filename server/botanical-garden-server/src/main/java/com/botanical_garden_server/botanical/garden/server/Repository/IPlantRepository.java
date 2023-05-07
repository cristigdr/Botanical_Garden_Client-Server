package com.botanical_garden_server.botanical.garden.server.Repository;

import com.botanical_garden_server.botanical.garden.server.Model.Plant;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface IPlantRepository extends JpaRepository<Plant, Long> {

    List<Plant> findByOrderByTypeAscSpeciesAsc();

    default List<Plant> filterPlants(String criteria, String value) {
        List<Plant> allPlants = findAll();
        List<Plant> filteredPlants = new ArrayList<>();
        for (Plant plant : allPlants) {
            switch (criteria) {
                case "name":
                    if (plant.getName().toLowerCase().contains(value.toLowerCase())) {
                        filteredPlants.add(plant);
                    }
                    break;
                case "type":
                    if (plant.getType().toLowerCase().contains(value.toLowerCase())) {
                        filteredPlants.add(plant);
                    }
                    break;
                case "species":
                    if (plant.getSpecies().toLowerCase().contains(value.toLowerCase())) {
                        filteredPlants.add(plant);
                    }
                    break;
                case "carnivorous":
                    if (plant.getCarnivorous().toLowerCase().contains(value.toLowerCase())) {
                        filteredPlants.add(plant);
                    }
                    break;
                case "zone":
                    if (plant.getZone().toLowerCase().contains(value.toLowerCase())) {
                        filteredPlants.add(plant);
                    }
                    break;
                default:
                    throw new IllegalArgumentException("Invalid criteria: " + criteria);
            }
        }
        return filteredPlants;
    }


    boolean existsByIdAndNameAndTypeAndSpeciesAndCarnivorousAndZone(Long id, String name, String type, String species, String carnivorous, String zone);

}

