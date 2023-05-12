import {useEffect, useState} from "react";
import httpClient from "./httpClient";
import {I18nextProvider, useTranslation} from "react-i18next";
import i18n from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

export default function UpdatePlant({ id, onPlantUpdated }) {

    const { t } = useTranslation();
    const [plantData, setPlantData] = useState({
        id: "",
        name: "",
        type: "",
        species: "",
        carnivorous: "—",
        zone: "",
    });
    const [showMessageBox, setShowMessageBox] = useState(false);
    const [success, setSuccess] = useState(false);


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
            setSuccess(false);
            setShowMessageBox(false);
            const response = await httpClient.put(
                "http://localhost:8080/updatePlant",
                plantData
            );

            if (response.status === 200) {
                setSuccess(true);
                setShowMessageBox(true);
                onPlantUpdated();

            } else {
                setSuccess(false);
                setShowMessageBox(true);
            }

            console.log(response.data);
        } catch (error) {
            console.error(error);
            setSuccess(false);
            setShowMessageBox(true);
        }
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

        const backdrop = document.getElementById('updatePlant');
        backdrop.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            backdrop.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return(
        <I18nextProvider i18n={i18n}>

            <div className="modal fade" id="updatePlant" tabIndex="-1" aria-labelledby="updatePlantLabel"
                 aria-hidden="true">
                <div className="modal-dialog" style={{width: "fit-content"}}>
                    <div className="modal-content">
                        <div className="modal-header" >
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{t("employeePage.updatePl")}</h1>
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
                                            <p>{t("adminPage.updateErrorUs")}</p>
                                            <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff0000"}} size="2xl" />

                                        </>
                                    )}
                                </div>
                            )}

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
                                            <label htmlFor="floatingInput"><strong>{t("employeePage.name")}:</strong></label>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   className="form-control"
                                                   id="floatingInput"
                                                   placeholder="name@example.com"
                                                   value={plantData.type}
                                                   onChange={(e) => setPlantData({ ...plantData, type: e.target.value })}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>{t("employeePage.type")}:</strong></label>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input type="text"
                                                   className="form-control"
                                                   id="floatingInput"
                                                   placeholder="name@example.com"
                                                   value={plantData.species}
                                                   onChange={(e) => setPlantData({ ...plantData, species: e.target.value })}
                                            ></input>
                                            <label htmlFor="floatingInput"><strong>{t("employeePage.species")}:</strong></label>
                                        </div>

                                        <li className="list-group-item">
                                            <strong>{t("employeePage.carnivorous")}:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <input type="checkbox"
                                                   checked={plantData.carnivorous === "✓"}
                                                   onChange={(e) => setPlantData({ ...plantData, carnivorous: e.target.checked ? '✓' : '—' })}
                                            />
                                        </li>

                                        <li className="list-group-item">
                                            <strong>{t("employeePage.zone")}:</strong> <br/>
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
                                        >{t("employeePage.updatePlBttn")}</button>
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