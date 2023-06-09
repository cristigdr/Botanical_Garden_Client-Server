import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Guest from "./Pages/Guest";
import Employee from "./Pages/Employee";
import Admin from "./Pages/Admin";
import StatisticsPlants from "./Pages/StatisticsPlants";



function App() {



  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/admin" element={<Admin />} />
            <Route path="/statsPlants" element={<StatisticsPlants />} />
        </Routes>
      </Router>  );
}

export default App;
