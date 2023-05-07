import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Guest from "./Pages/Guest";
import Employee from "./Pages/Employee";
import Admin from "./Pages/Admin";
import AddPlant from "./Pages/AddPlant";
import UpdatePlant from "./Pages/UpdatePlant";
import AddUser from "./Pages/AddUser";
import UpdateUser from "./Pages/UpdateUser";
import StatisticsPlants from "./Pages/StatisticsPlants";



function App() {



  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/admin" element={<Admin />} />
            <Route path="/addPlant" element={<AddPlant />} />
            <Route path="/updatePlant/:id" element={<UpdatePlant />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/updateUser/:id" element={<UpdateUser />}/>
            <Route path="/statsPlants" element={<StatisticsPlants />} />
        </Routes>
      </Router>  );
}

export default App;
