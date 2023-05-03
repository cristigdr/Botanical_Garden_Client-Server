package com.botanical_garden_server.botanical.garden.server.Service;

import com.botanical_garden_server.botanical.garden.server.Model.Plant;
import com.botanical_garden_server.botanical.garden.server.Repository.IPlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlantService {

    @Autowired
    private IPlantRepository plantRepo;

    public List<Plant> getPlants(){
        return(List<Plant>) this.plantRepo.findAll();
    }

    public Plant inserPlant(Plant plant){
        return this.plantRepo.save(plant);
    }

    public String deletePlant(Long id){
        try{
            this.plantRepo.deleteById(id);
            return "Deletion Successfully";
        }catch (Exception e){
            return "Failed o delete user with id" + id;
        }
    }

    public boolean existsByIdAndNameAndTypeAndSpeciesAndZone(Plant plant){
        return this.plantRepo.existsByIdAndNameAndTypeAndSpeciesAndZone(plant);
    }

    public List<Plant> filterPlants(String criteria, String filter){
        return this.plantRepo.filterPlants(criteria, filter);
    }
}
