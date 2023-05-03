package com.botanical_garden_server.botanical.garden.server.Repository;

import com.botanical_garden_server.botanical.garden.server.Model.Plant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPlantRepository extends CrudRepository<Plant, Long> {

    @Query("SELECT p FROM Plant p WHERE p.{criteria} = :filter")
    List<Plant> filterPlants(@Param("criteria") String criteria, @Param("filter") String filter);

    boolean existsByIdAndNameAndTypeAndSpeciesAndZone(Plant plant);

}

