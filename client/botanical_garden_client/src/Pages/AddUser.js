import {useState} from "react";
import httpClient from "./httpClient";

export default function AddUser(){

    const[addUserData, setAddUserData] = useState({
        user: "",
        password: "",
        role: "",
    });


    const handleSubmit = async () => {
        try {
            const response = await httpClient.post(
                "http://localhost:8080/insertUser",
                addUserData
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return(

        <div className="card" id="addUserCard" style={{ width: "18rem" }}>
            <ul className="list-group list-group-flush">

                <div className="form-floating mb-3">
                    <input type="text"
                           className="form-control"
                           id="user"
                           placeholder="name@example.com"
                           value={addUserData.user}
                           onChange={(e) => setAddUserData({ ...addUserData, user: e.target.value })}
                           required={true}
                    ></input>
                    <label htmlFor="floatingInput"><strong>Utilizator</strong></label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text"
                           className="form-control"
                           id="password"
                           placeholder="name@example.com"
                           value={addUserData.password}
                           onChange={(e) => setAddUserData({ ...addUserData, password: e.target.value })}
                           required={true}
                    ></input>
                    <label htmlFor="floatingInput"><strong>Parola</strong></label>
                </div>

                <li className="list-group-item">

                    <strong>Rol:</strong> <br/>

                    <label><input type="radio"
                                  name="zone"
                                  value="administrator"
                                  checked={addUserData.role === "administrator"}
                                  onChange={(e) => setAddUserData({ ...addUserData, role: e.target.value })}
                    /> Administrator</label>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <label><input type="radio"
                                  name="zone"
                                  value="angajat"
                                  checked={addUserData.role === "angajat"}
                                  onChange={(e) => setAddUserData({ ...addUserData, role: e.target.value })}
                    /> Angajat</label>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                </li>

                <button type="button"
                        className="btn btn-success"
                        style={{width: 'fit-content', margin: "5% auto"}}
                        onClick={handleSubmit}
                >Adaugare</button>

            </ul>
        </div>
    )
}