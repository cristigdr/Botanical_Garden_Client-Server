import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import httpClient from "./httpClient";

export default function Guest(){

    const [buttonText, setButtonText] = useState('Criteriu');
    const[plants, setPlants] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('');

    function handleItemClick(event) {
        setFilterCriteria(event.target.getAttribute('data-criteria'));
        setButtonText(event.target.innerText);
    }

    const [showSearchForm, setshowSearchForm] = useState(false);

    const handleMouseEnter = () => {
        setshowSearchForm(true);
    }

    const handleMouseLeave = () => {
        setshowSearchForm(false);
    }

    useEffect( () =>{
        async function fetchAllPlants(){
            try{
                const response = await httpClient.get('http://localhost:8080/getPlants');
                setPlants(response.data);
            }catch (error){
                console.error(error);
            }
        }
        fetchAllPlants();
    }, []);


    async function handleFilterPlants(criteria, filter) {
        try {
            const response = await httpClient.get(`http://localhost:8080/filterPlants/${criteria}/${filter}`);
            setPlants(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function handleFilterClick() {
        handleFilterPlants(filterCriteria, filterValue);
    }

    return(
        <div id="guestPage">

            <div className="text" onMouseEnter={handleMouseEnter}>Bun venit!</div>

            <div id="searchForm" style={{ display: showSearchForm ? 'block' : 'none' }} onMouseLeave={handleMouseLeave}>

                <div className="btn-group dropdown">
                    <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" data-bs-trigger="hover" aria-expanded="false">
                        {buttonText}
                    </button>
                    <ul className="dropdown-menu">
                        <li><label className="dropdown-item" data-criteria="name" onClick={handleItemClick} >Denumire</label></li>
                        <li><label className="dropdown-item"  data-criteria="type" onClick={handleItemClick} >Tip</label></li>
                        <li><label className="dropdown-item"  data-criteria="species" onClick={handleItemClick} >Specie</label></li>
                        <li><label className="dropdown-item"  data-criteria="carnivorous" onClick={handleItemClick} >Plantă carnivoră</label></li>
                        <li><label className="dropdown-item" data-criteria="zone" onClick={handleItemClick} >Zonă</label></li>
                    </ul>
                </div>

                <div id="input-container">
                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control"
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={filterValue}
                               onChange={(event) => setFilterValue(event.target.value)}
                        ></input>
                        <label htmlFor="floatingInput">Filtru</label>
                    </div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" style={{color: "#307853",}} onClick={handleFilterClick}/>
                </div>

            </div>

            <div id="cardGroup" style={{top: showSearchForm ? '30%' : '20%'}}>

                {plants.map(plant => (

                    <div className="card" style={{width: "18rem",}}>
                            <div className="card-body">

                                {plant.image && (
                                    <img
                                        className="card-img-top"
                                        src={`data:image/jpeg;base64, ${plant.image}`}
                                    />
                                )}
                                <h5 className="card-title" style={{marginTop: "6%", textAlign: "center"}}><b>Denumire:</b>{plant.name}</h5>

                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><b>Tip:</b> &nbsp; {plant.type}</li>
                                <li className="list-group-item"><b>Specie:</b> &nbsp; {plant.species}</li>
                                <li className="list-group-item"><b>Planta carnivora:</b> &nbsp; {plant.type}</li>
                                <li className="list-group-item"><b>Zona gradina botanica:</b> &nbsp; {plant.zone}</li>
                            </ul>
                    </div>
                ))}
            </div>

        </div>
    )
}