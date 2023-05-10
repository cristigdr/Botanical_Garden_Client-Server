import {useEffect, useState} from "react";
import httpClient from "./httpClient";

export default function UpdatePlant({ id }) {


    const [plantData, setPlantData] = useState({
        id: "",
        name: "",
        type: "",
        species: "",
        carnivorous: "Nu",
        zone: "",
    });

    useEffect(() => {
        async function fetchPlant(){
            try {
                const response = await httpClient.get(`http://localhost:8080/getPlant/${id}`);
                setPlantData(response.data);

            } catch (error) {
                console.error(error);
            }
        }fetchPlant();
    }, [id]);


    const handleSubmit = async () => {
        try {
            const response = await httpClient.put(
                "http://localhost:8080/updatePlant",
                plantData
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div id ="i">

            <div className="card" id="updatePlantCard" style={{ width: "18rem" }}>

                <ul className="list-group list-group-flush">

                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control"
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={plantData.id}
                               onChange={(e) => setPlantData({ ...plantData, id: e.target.value })}
                               disabled
                        ></input>
                        <label htmlFor="floatingInput"><strong>Id:</strong></label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control"
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={plantData.name}
                               onChange={(e) => setPlantData({ ...plantData, name: e.target.value })}
                        ></input>
                        <label htmlFor="floatingInput"><strong>Denumire</strong></label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control"
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={plantData.type}
                               onChange={(e) => setPlantData({ ...plantData, type: e.target.value })}
                        ></input>
                        <label htmlFor="floatingInput"><strong>Tip</strong></label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control"
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={plantData.species}
                               onChange={(e) => setPlantData({ ...plantData, species: e.target.value })}
                        ></input>
                        <label htmlFor="floatingInput"><strong>Specie</strong></label>
                    </div>

                    <li className="list-group-item">
                        <strong>Planta carnivora:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="checkbox"
                               checked={plantData.carnivorous === "Da"}
                               onChange={(e) => setPlantData({ ...plantData, carnivorous: e.target.checked ? "Da" : "Nu" })}
                        />
                    </li>

                    <li className="list-group-item">
                        <strong>Zona gradina botanica:</strong> <br/>
                        <label><input type="radio"
                                      name="zone"
                                      value="A"
                                      checked={plantData.zone === "A"}
                                      onChange={(e) => setPlantData({ ...plantData, zone: e.target.value })}
                        /> A</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <label><input type="radio"
                                      name="zone"
                                      value="B"
                                      checked={plantData.zone === "B"}
                                      onChange={(e) => setPlantData({ ...plantData, zone: e.target.value })}
                        /> B</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <label><input type="radio"
                                      name="zone"
                                      value="C"
                                      checked={plantData.zone === "C"}
                                      onChange={(e) => setPlantData({ ...plantData, zone: e.target.value })}
                        /> C</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <label><input type="radio"
                                      name="zone"
                                      value="D"
                                      checked={plantData.zone === "D"}
                                      onChange={(e) => setPlantData({ ...plantData, zone: e.target.value })}
                        /> D</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

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