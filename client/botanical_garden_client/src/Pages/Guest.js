import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Guest(){

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
        <div id="guestPage">

            <div className="text" onMouseEnter={handleMouseEnter}>Bun venit!</div>

            <div id="searchForm" style={{ display: showSearchForm ? 'block' : 'none' }} onMouseLeave={handleMouseLeave}>

                <div className="btn-group dropdown">
                    <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" data-bs-trigger="hover" aria-expanded="false">
                        {buttonText}
                    </button>
                    <ul className="dropdown-menu">
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

            <div id="cardGroup" style={{top: showSearchForm ? '20%' : '20%'}}>
                <div className="card" style={{width: "18rem",}}>

                    <div className="card-body">

                        <img src="images/default.jpeg" className="card-img-top" alt="default"/>

                        <h5 className="card-title">Denumire</h5>

                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Tip</li>
                        <li className="list-group-item">Specie</li>
                        <li className="list-group-item">Planta carnivora</li>
                        <li className="list-group-item">Zona gradina botanica</li>

                    </ul>

                </div>
            </div>

        </div>
    )
}