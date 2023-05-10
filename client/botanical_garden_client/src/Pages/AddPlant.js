import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import httpClient from "./httpClient";
import FormData from "form-data";
import {I18nextProvider, useTranslation} from "react-i18next";
import i18n from "../i18n";

export default function AddPlant(){

    const { t } = useTranslation();
    const[addPlantData, setAddPlantData] = useState({
        name: "",
        type: "",
        species: "",
        carnivorous: "—",
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
        <I18nextProvider i18n={i18n}>

            <div id ="i">

                <div className="card" id="addPlantCard" style={{ width: "18rem" }}>
                    <div className="card-body" >

                        <label htmlFor="image-upload" className="custom-file-upload">
                            <FontAwesomeIcon icon={faPlus} size="2xl" />
                        </label>

                        <p> {t("employeePage.loadImg")} </p>

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
                            <label htmlFor="floatingInput"><strong>{t("employeePage.name")}:</strong></label>
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
                            <label htmlFor="floatingInput"><strong>{t("employeePage.type")}:</strong></label>
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
                            <label htmlFor="floatingInput"><strong>{t("employeePage.species")}:</strong></label>
                        </div>

                        <li className="list-group-item">
                            <strong>{t("employeePage.carnivorous")}:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="checkbox"
                                   onChange={(e) => setAddPlantData({ ...addPlantData, carnivorous: e.target.checked ? '✓' : '—' })}
                            />
                        </li>

                        <li className="list-group-item">
                            <strong>{t("employeePage.zone")}:</strong> <br/>
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
                        >{t("employeePage.addPlBttn")}</button>

                    </ul>
                </div>

            </div>

        </I18nextProvider>

    )
}