import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChartSimple, faCode,
    faFileCsv,
    faFileLines,
    faMagnifyingGlass,
    faPen,
    faPlus,
    faTrash,


} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import httpClient from "./httpClient";

export default function Employee(){
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


    const handeDeletePlant = async (id) => {
        try {
            await httpClient.delete(`http://localhost:8080/deletePlant/${id}`);
            setPlants(plants.filter((plant) => plant.id !== id));
        } catch (error) {
            console.error(error);
        }
    };


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


    //download data in JSON format
    const downloadJsonData = () => {
        const filteredData = plants.map(({ image, ...rest }) => rest); // remove the 'image' property from each object
        const jsonData = JSON.stringify(filteredData, null, 2); // convert data to JSON string with pretty-printing
        const blob = new Blob([jsonData], { type: "application/json" }); // create a Blob object
        const url = URL.createObjectURL(blob); // create a temporary URL for the Blob object
        const link = document.createElement("a"); // create a link element
        link.href = url; // set the link URL to the temporary URL
        link.download = "plants.json"; // set the download file name
        link.click(); // simulate a click on the link to trigger the download
    };

    return(
        <div id ="employeePage">

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
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" style={{color: "#307853",}} onClick={handleFilterClick}
                    />
                </div>

            </div>

            <div id="tableEmployee" style={{top: showSearchForm ? '30%' : '20%'}}>

                <div style={{ display: "flex", alignItems: "center", marginBottom: "3%"}}>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Link to='/addPlant' >
                            <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "white" }} />
                        </Link>
                        <span style={{ marginLeft: "10px", color: "white" }}>Adaugare Planta</span>
                    </div>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Link to='/statsPlants' >
                            <FontAwesomeIcon icon={faChartSimple} size="xl" style={{color: "white",}} />
                        </Link>
                        <span style={{ marginLeft: "10px", color: "white" }}>Statistici</span>
                    </div>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FontAwesomeIcon icon={faFileCsv} size="lg" style={{color: "#ffffff",}} />
                        <span style={{ marginLeft: "10px", color: "white" }}>CVS</span>
                    </div>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FontAwesomeIcon icon={faFileLines} size="lg" style={{color: "#ffffff",}} />
                        <span style={{ marginLeft: "10px", color: "white" }}>txt</span>
                    </div>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginLeft: "10px", color: "white", cursor:"pointer" }} onClick={downloadJsonData}>
                            <b style={{fontSize: "125%"}}>{"{ }"}</b> &nbsp;&nbsp;json
                        </span>
                    </div>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FontAwesomeIcon icon={faCode} size="lg" style={{color: "#ffffff",}} />
                        <span style={{ marginLeft: "10px", color: "white" }}>xml</span>
                    </div>

                </div>

                <table className="table table-hover">

                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Denumire</th>
                        <th scope="col">Tip</th>
                        <th scope="col">Specie</th>
                        <th scope="col">Planta Carnivora</th>
                        <th scope="col">Zona Gradina</th>
                        <th scope="col">Imagine</th>
                        <th scope="col">Operatii</th>
                    </tr>
                    </thead>

                    <tbody>
                        {plants.map(plant => (
                            <tr key={plant.id}>
                                <th scope="row">{plant.id}</th>
                                <td>{plant.name}</td>
                                <td>{plant.type}</td>
                                <td>{plant.species}</td>
                                <td>{plant.carnivorous}</td>
                                <td>{plant.zone}</td>
                                <td>
                                    {plant.image && (
                                        <img
                                            id="tabImg"
                                            src={`data:image/jpeg;base64, ${plant.image}`}
                                        />
                                    )}
                                </td>
                                <td>
                                    <Link to={`/updatePlant/${plant.id}`} >
                                        <FontAwesomeIcon icon={faPen}  style={{color: "white",}}/>
                                    </Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faTrash}
                                                     onClick={() => handeDeletePlant(plant.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}