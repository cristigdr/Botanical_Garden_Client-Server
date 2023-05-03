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
import {useState} from "react";
import {Link} from "react-router-dom";

export default function Employee(){
    const [buttonText, setButtonText] = useState('Criteriu');

    function handleItemClick(event) {
        setButtonText(event.target.innerText);
    }

    const [showSearchForm, setshowSearchForm] = useState(false);

    const handleMouseEnter = () => {
        setshowSearchForm(true);
    }

    const handleMouseLeave = () => {
        setshowSearchForm(false);
    }
    return(
        <div id ="employeePage">

            <div className="text" onMouseEnter={handleMouseEnter}>Bun venit!</div>

            <div id="searchForm" style={{ display: showSearchForm ? 'block' : 'none' }} onMouseLeave={handleMouseLeave}>

                <div className="btn-group dropdown">
                    <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" data-bs-trigger="hover" aria-expanded="false">
                        {buttonText}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={handleItemClick}>Denumire</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleItemClick}>Tip</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleItemClick}>Specie</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleItemClick}>Plantă carnivoră</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleItemClick}>Zonă</a></li>
                    </ul>
                </div>

                <div id="input-container">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                        <label htmlFor="floatingInput">Filtru</label>
                    </div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} beat size="2xl" style={{color: "#307853",}} />
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
                        <label style={{color: "white", fontWeight: "bold"}}>{"{ "}</label>
                        <span style={{color: "white"}}>&nbsp;&nbsp;</span>
                        <label style={{color: "white", fontWeight: "bold"}}>{" }"}</label>
                        <span style={{ marginLeft: "10px", color: "white" }}>json</span>
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
                    <tr>
                        <th scope="row">1</th>
                        <td>Papadie</td>
                        <td>Floare</td>
                        <td>Papadie galbena</td>
                        <td>Nu</td>
                        <td>A</td>
                        <td><img src="images/default.jpeg" alt="Default Image" id="tabImg"/></td>
                        <td>
                            <Link to='/updatePlant' >
                                <FontAwesomeIcon icon={faPen}  style={{color: "white",}}/>
                            </Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon icon={faTrash} />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}