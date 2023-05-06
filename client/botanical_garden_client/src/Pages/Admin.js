import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import httpClient from "./httpClient";

export default function Admin(){
    const [buttonText, setButtonText] = useState('Tip Utilizator');
    const[users, setUsers] = useState([]);
    const [showSearchForm, setshowSearchForm] = useState(false);



    function handleItemClick(event) {
        setButtonText(event.target.innerText);
    }



    const handleMouseEnter = () => {
        setshowSearchForm(true);
    }


    const handleMouseLeave = () => {
        setshowSearchForm(false);
    }


    useEffect( () =>{
        async function fetchAllUsers(){
            try{
                const response = await httpClient.get('http://localhost:8080/getUsers');
                setUsers(response.data);
            }catch (error){
                console.error(error);
            }
        }
        fetchAllUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        try {
            await httpClient.delete(`http://localhost:8080/deleteUser/${id}`);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error(error);
        }
    };


    return(
        <div id ="adminPage">

            <div className="text" onMouseEnter={handleMouseEnter}>Bun venit!</div>

            <div id="searchForm" style={{ display: showSearchForm ? 'block' : 'none' , top: '20%'}} onMouseLeave={handleMouseLeave}>

                <label style={{color: 'white', marginBottom: '2%'}}><strong> Filtrare utilizatori:</strong></label>

                <div className="btn-group dropdown">

                    <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" data-bs-trigger="hover" aria-expanded="false">
                        {buttonText}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={handleItemClick}>Administrator</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleItemClick}>Angajat</a></li>
                    </ul>
                </div>


            </div>

            <div id="tableEmployee" style={{top: showSearchForm ? '20%' : '20%'}}>


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
                            {users.map(user => (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.user}</td>
                                    <td>{user.password}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Link to={`/updateUser/${user.id}`}>
                                            <FontAwesomeIcon icon={faPen}  style={{color: "white",}}/>
                                        </Link>

                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        <FontAwesomeIcon icon={faTrash}
                                                         onClick={() => handleDeleteUser(user.id)}
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