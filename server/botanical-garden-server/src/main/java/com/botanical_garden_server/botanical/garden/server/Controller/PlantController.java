package com.botanical_garden_server.botanical.garden.server.Controller;

import com.botanical_garden_server.botanical.garden.server.Model.Plant;
import com.botanical_garden_server.botanical.garden.server.Service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PlantController {

    @Autowired
    private PlantService plantService;

    @GetMapping("/getPlants")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public List<Plant> getAllPlants(){
        return this.plantService.getPlants();
    }


    @GetMapping("/getPlant/{id}")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public Optional<Plant> getPlant(@PathVariable("id") Long plantId){
        return this.plantService.getPlantById(plantId);
    }


    @PostMapping("/insertPlant")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public Plant insertPlant(@RequestBody Plant plant){
        return this.plantService.inserPlant(plant);
    }


    @PutMapping("/updatePlant")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public Plant updatePlant(@RequestBody Plant plant){
        return this.plantService.updatePlant(plant);
    }


    @DeleteMapping("/deletePlant/{id}")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public String deletePlant(@PathVariable("id") Long id){
        return this.plantService.deletePlant(id);
    }


    @GetMapping("/filterPlants/{criteria}/{filter}")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public List<Plant> filterPlants(@PathVariable("criteria") String criteria, @PathVariable("filter") String filter){
        return this.plantService.filterPlants(criteria, filter);
    }
}
