import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import httpClient from "./httpClient";
import FormData from "form-data";

export default function AddPlant(){

    const[addPlantData, setAddPlantData] = useState({
        name: "",
        type: "",
        species: "",
        carnivorous: "Nu",
        zone: "",
    });

    const [imageFile, setImageFile] = useState(null);


    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('imageFile', imageFile);
            formData.append('name', addPlantData.name);
            formData.append('type', addPlantData.type);
            formData.append('species', addPlantData.species);
            formData.append('carnivorous', addPlantData.carnivorous);
            formData.append('zone', addPlantData.zone);

            const response = await httpClient.post(
                `http://localhost:8080/insertPlant`,
                formData
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileInputChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    return(
        <div id ="employeePage">
            <div className="text" style={{ width: '50%'}}>Adaugare planta:</div>

            <div className="card" id="addPlantCard" style={{ width: "18rem" }}>
                <div className="card-body" >

                    <label htmlFor="image-upload" className="custom-file-upload">
                        <FontAwesomeIcon icon={faPlus} size="2xl" />
                    </label>

                    <p> Incarca o imagine </p>

                    <input id="image-upload"
                           type="file" style={{ display: "none" }}
                           onChange={handleFileInputChange}
                    />

                </div>

                <ul className="list-group list-group-flush">

                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control"
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={addPlantData.name}
                               onChange={(e) => setAddPlantData({ ...addPlantData, name: e.target.value })}
                               required={true}
                        ></input>
                        <label htmlFor="floatingInput"><strong>Denumire</strong></label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control"
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={addPlantData.type}
                               onChange={(e) => setAddPlantData({ ...addPlantData, type: e.target.value })}
                               required={true}
                        ></input>
                        <label htmlFor="floatingInput"><strong>Tip</strong></label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control"
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={addPlantData.species}
                               onChange={(e) => setAddPlantData({ ...addPlantData, species: e.target.value })}
                               required={true}
                        ></input>
                        <label htmlFor="floatingInput"><strong>Specie</strong></label>
                    </div>

                    <li className="list-group-item">
                        <strong>Planta carnivora:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="checkbox"
                               onChange={(e) => setAddPlantData({ ...addPlantData, carnivorous: e.target.checked ? 'Da' : 'Nu' })}
                        />
                    </li>

                    <li className="list-group-item">
                        <strong>Zona gradina botanica:</strong> <br/>
                        <label><input type="radio"
                                      name="zone"
                                      value="A"
                                      checked={addPlantData.zone === "A"}
                                      onChange={(e) => setAddPlantData({ ...addPlantData, zone: e.target.value })}
                        /> A</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <label><input type="radio"
                                      name="zone"
                                      value="B"
                                      checked={addPlantData.zone === "B"}
                                      onChange={(e) => setAddPlantData({ ...addPlantData, zone: e.target.value })}
                        /> B</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <label><input type="radio"
                                      name="zone"
                                      value="C"
                                      checked={addPlantData.zone === "C"}
                                      onChange={(e) => setAddPlantData({ ...addPlantData, zone: e.target.value })}
                        /> C</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <label><input type="radio"
                                      name="zone"
                                      value="D"
                                      checked={addPlantData.zone === "D"}
                                      onChange={(e) => setAddPlantData({ ...addPlantData, zone: e.target.value })}
                        /> D</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </li>

                    <button type="button"
                            className="btn btn-success"
                            style={{width: 'fit-content', margin: "5% auto"}}
                            onClick={handleSubmit}
                    >Adaugare</button>

                </ul>
            </div>

        </div>
    )
}