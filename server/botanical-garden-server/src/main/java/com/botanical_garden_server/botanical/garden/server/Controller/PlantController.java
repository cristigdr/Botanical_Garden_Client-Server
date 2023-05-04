package com.botanical_garden_server.botanical.garden.server.Controller;

import com.botanical_garden_server.botanical.garden.server.Model.Plant;
import com.botanical_garden_server.botanical.garden.server.Service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlantController {

    @Autowired
    private PlantService plantService;

    @GetMapping("/getPlants")
    @ResponseBody
    public List<Plant> getAllPlants(){
        return this.plantService.getPlants();
    }

    @PostMapping("/insertPlant")
    @ResponseBody
    public Plant insertPlant(@RequestBody Plant plant){
        return this.plantService.inserPlant(plant);
    }

    @PutMapping("/updatePlant")
    @ResponseBody
    public Plant updatePlant(@RequestBody Plant plant){
        return this.plantService.updatePlant(plant);
    }

    @DeleteMapping("/deletePlant")
    @ResponseBody
    public String deletePlant(@RequestParam Long id){
        return this.plantService.deletePlant(id);
    }

    @GetMapping("/filterPlants")
    @ResponseBody
    public List<Plant> filterPlants(@RequestParam String criteria, @RequestParam String filter){
        return this.plantService.filterPlants(criteria, filter);
    }
}
