import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default function Admin(){
    const [buttonText, setButtonText] = useState('Tip Utilizator');

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
        <div id ="adminPage">

            <div className="text" onMouseEnter={handleMouseEnter}>Bun venit!</div>

            <div id="searchForm" style={{ display: showSearchForm ? 'block' : 'none' }} onMouseLeave={handleMouseLeave}>

                <div className="btn-group dropdown">
                    <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" data-bs-trigger="hover" aria-expanded="false">
                        {buttonText}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={handleItemClick}>Administrator</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleItemClick}>Angajat</a></li>
                    </ul>
                </div>

                <div id="input-container">

                    <FontAwesomeIcon icon={faMagnifyingGlass} beat size="2xl" style={{color: "#307853",}} />
                </div>

            </div>

            <div id="tableEmployee" style={{top: showSearchForm ? '30%' : '20%'}}>
                <table className="table table-hover">

                    <thead>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Link to='/addUser' >
                            <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "white" }} />
                        </Link>
                        <span style={{ marginLeft: "10px", color: "white" }}>Adaugare Utilizator</span>
                    </div>

                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Utilizator</th>
                        <th scope="col">Parola</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Operatii</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>cristi</td>
                        <td>12345</td>
                        <td>administrator</td>
                        <td>
                            <Link to='/updateUser' >
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