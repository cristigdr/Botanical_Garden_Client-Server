package com.botanical_garden_server.botanical.garden.server.Service;

import com.botanical_garden_server.botanical.garden.server.Model.Plant;
import com.botanical_garden_server.botanical.garden.server.Repository.IPlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PlantService {

    @Autowired
    private IPlantRepository plantRepo;

    public List<Plant> getPlants(){
        return(List<Plant>) this.plantRepo.findByOrderByTypeAscSpeciesAsc();
    }

    public Optional<Plant> getPlantById(Long id){
        return this.plantRepo.findById(id);
    }

    public List<Object[]> getCarnivorousCount(){return this.plantRepo.countByCarnivorous();}

    public Plant insertPlant(Plant plant, MultipartFile imageFile) throws IOException {
        byte[] imageBytes = null;
        if (imageFile != null && !imageFile.isEmpty()) {
            imageBytes = imageFile.getBytes();
        }
        plant.setImage(imageBytes);
        return this.plantRepo.save(plant);
    }


    public Plant updatePlant(Plant updatedPlant) {
        Plant existingPlant = plantRepo.findById(updatedPlant.getId()).orElse(null);

        if (existingPlant != null) {
            existingPlant.setName(updatedPlant.getName());
            existingPlant.setType(updatedPlant.getType());
            existingPlant.setSpecies(updatedPlant.getSpecies());
            existingPlant.setCarnivorous(updatedPlant.getCarnivorous());
            existingPlant.setZone(updatedPlant.getZone());
            return plantRepo.save(existingPlant);
        }
        return null;
    }

    public String deletePlant(Long id){
        try{
            this.plantRepo.deleteById(id);
            return "Deletion Successfully";
        }catch (Exception e){
            return "Failed o delete user with id" + id;
        }
    }

    public boolean existsByIdAndNameAndTypeAndSpeciesAndZone(Long id, String name, String type, String species, String carnivorous, String zone){
        return this.plantRepo.existsByIdAndNameAndTypeAndSpeciesAndCarnivorousAndZone(id, name, type, species, carnivorous, zone);
    }

    public List<Plant> filterPlants(String criteria, String filter){
        return this.plantRepo.filterPlants(criteria, filter);
    }
}
