import {useEffect, useState} from "react";
import httpClient from "./httpClient";
import {useParams} from "react-router-dom";


export default function UpdateUser(){
    const { id } = useParams();

    const [userData, setUserData] = useState({
        name: '',
        password: '',
        role: '',
    });



        useEffect(() => {
            async function fetchUser(){
                try {
                    const response = await httpClient.get(`http://localhost:8080/getUser/${id}`);
                    setUserData(response.data);

                } catch (error) {
                    console.error(error);
                }
            }fetchUser();
        }, [id]);

    const handleSubmit = async () => {
        try {
            const response = await httpClient.put(
                "http://localhost:8080/updateUser",
                userData
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div id ="adminPage">
            <div className="text" style={{ width: '60%'}}>Actualizare utilizator:</div>

            <div className="card" id="addUserCard" style={{ width: "18rem" }}>

                <ul className="list-group list-group-flush">

                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control"
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={userData.id}
                               onChange={(e) => setUserData({ ...userData, id: e.target.value })}
                               disabled
                        ></input>
                        <label htmlFor="floatingInput"><strong>Id:</strong></label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control"
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={userData.user}
                               onChange={(e) => setUserData({ ...userData, user: e.target.value })}
                        ></input>
                        <label htmlFor="floatingInput"><strong>Utilizator:</strong></label>
                    </div>

                    <div className="form-floating mb-3">

                        <input type="text"
                               className="form-control"
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={userData.password}
                               onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        ></input>
                        <label htmlFor="floatingInput"><strong>Parola:</strong></label>
                    </div>

                    <li className="list-group-item">

                        <strong>Rol:</strong> <br/>

                        <label>
                            <input
                                type="radio"
                                name="zone"
                                value="administrator"
                                checked={userData.role === "administrator"}
                                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                            />{" "}
                            Administrator
                        </label>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <label>
                            <input
                                type="radio"
                                name="zone"
                                value="angajat"
                                checked={userData.role === "angajat"}
                                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                            />{" "}
                            Angajat
                        </label>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </li>

                    <button type="button"
                            className="btn btn-success"
                            style={{width: 'fit-content', margin: "5% auto"}}
                            onClick={handleSubmit}
                    >Actualizare</button>

                </ul>
            </div>

        </div>
    )
}