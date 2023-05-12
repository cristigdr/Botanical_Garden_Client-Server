import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleExclamation, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
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
    const [showMessageBox, setShowMessageBox] = useState(false);
    const [success, setSuccess] = useState(false);
    const [imageFile, setImageFile] = useState(null);


    const handleSubmit = async () => {
        try {
            setSuccess(false);
            setShowMessageBox(false);

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

            if (response.status === 200) {
                setAddPlantData({ name: "", type: "", species: "", carnivorous: "", zone: ""});
                setSuccess(true);
                setShowMessageBox(true);

            } else {
                setSuccess(false);
                setShowMessageBox(true);
            }

        } catch (error) {
            console.error(error);
            setSuccess(false);
            setShowMessageBox(true);
        }
    };

    const handleFileInputChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleClick = () => {
        setShowMessageBox(false);
        setSuccess(false);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                handleClick();
            }
        };

        const backdrop = document.getElementById('addPlant');
        backdrop.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            backdrop.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return(
        <I18nextProvider i18n={i18n}>

            <div className="modal fade" id="addPlant" tabIndex="-1" aria-labelledby="addPlantLabel"
                 aria-hidden="true">
                <div className="modal-dialog" style={{width: "fit-content"}}>
                    <div className="modal-content">
                        <div className="modal-header" >
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{t("employeePage.addPl")}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {showMessageBox && (
                                <div id="message">
                                    {success ? (
                                        <>
                                            <p>{t("adminPage.successMess")}</p>
                                            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#10d14a"}} size="2xl" />

                                        </>
                                    ) : (
                                        <>
                                            <p>{t("adminPage.errorMessAddUs")}</p>
                                            <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff0000"}} size="2xl" />

                                        </>
                                    )}
                                </div>
                            )}

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

                        </div>
                    </div>
                </div>
            </div>

        </I18nextProvider>

    )
}