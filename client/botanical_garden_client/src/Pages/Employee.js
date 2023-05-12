import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartSimple, faCircleExclamation, faCode,
    faFileCsv,
    faFileLines,
    faMagnifyingGlass,
    faPen,
    faPlus,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import httpClient from "./httpClient";
import xmlBuilder from "xmlbuilder";
import {I18nextProvider, useTranslation} from "react-i18next";
import i18n from '../i18n';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import AddPlant from "./AddPlant";
import { Modal } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UpdatePlant from "./UpdatePlant";


export default function Employee(){
    const { t } = useTranslation();
    const [buttonText, setButtonText] = useState(t("employeePage.criteria"));
    const[plants, setPlants] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('');
    const [selectedPlantId, setSelectedPlantId] = useState(null);
    const[showWarningDelete, setShowWarningDelete] = useState(false);
    const[deleteId, setDeleteId] = useState(null);
    const[plantChanges, setPlantChanges] = useState(false);

    function handleItemClick(event) {
        setFilterCriteria(event.target.getAttribute('data-criteria'));
        setButtonText(event.target.innerText);
    }


    const [showSearchForm, setshowSearchForm] = useState(false);

    const handleMouseEnter = () => {
        setshowSearchForm(true);
    }


    const handleMouseLeave = () => {
        setshowSearchForm(false);
    }


    useEffect( () =>{
        async function fetchAllPlants(){
            setPlantChanges(false);
            try{
                const response = await httpClient.get('http://localhost:8080/getPlants');
                setPlants(response.data);
            }catch (error){
                console.error(error);
            }
        }
        fetchAllPlants();
    }, [plantChanges]);

    const handlePlantAddedOrUpdated = () => {
        setPlantChanges(true);
    };


    const handeDeletePlant = async (id) => {
        try {
            await httpClient.delete(`http://localhost:8080/deletePlant/${id}`);
            setPlants(plants.filter((plant) => plant.id !== id));
        } catch (error) {
            console.error(error);
        }
    };


    async function handleFilterPlants(criteria, filter) {
        try {
            const response = await httpClient.get(`http://localhost:8080/filterPlants/${criteria}/${filter}`);
            setPlants(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function handleFilterClick() {
        handleFilterPlants(filterCriteria, filterValue);
    }


    //download data in JSON format
    const downloadJsonData = () => {
        const filteredData = plants.map(({ image, ...rest }) => rest); // remove the 'image' property from each object
        const jsonData = JSON.stringify(filteredData, null, 2); // convert data to JSON string with pretty-printing
        const blob = new Blob([jsonData], { type: "application/json" }); // create a Blob object
        const url = URL.createObjectURL(blob); // create a temporary URL for the Blob object
        const link = document.createElement("a"); // create a link element
        link.href = url; // set the link URL to the temporary URL
        link.download = "plants.json"; // set the download file name
        link.click(); // simulate a click on the link to trigger the download
    };

    //download data in xml format
    const downloadXmlData = () => {
        const filteredData = plants.map(({ image, ...rest }) => rest);
        const xmlData = xmlBuilder
            .create("plants")
            .ele(filteredData.map((plant) => ({ plant })))
            .end({ pretty: true });
        const blob = new Blob([xmlData], { type: "application/xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "plants.xml";
        link.click();
    };

    //download data in csv format
    const downloadCsvData = () => {
        const filteredData = plants.map(({ image, ...rest }) => rest);
        const header = Object.keys(filteredData[0]).join(",");
        const csvRows = filteredData.map((plant) =>
            Object.values(plant).map((value) => `"${value}"`).join(",")
        );
        const csvData = [header, ...csvRows].join("\n");
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "plants.csv";
        link.click();
    };

    //download data in txt format
    const downloadTextData = () => {
        const filteredData = plants.map(({ image, ...rest }) => rest);
        const txtData = filteredData
            .map((plant) => Object.entries(plant)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n")
            )
            .join("\n\n");
        const blob = new Blob([txtData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "plants.txt";
        link.click();
    };

    function handleLanguageChange(language) {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
    }


    const openModalAdd = () => {
        const modalElement = document.getElementById("addPlant");
        const modal = new Modal(modalElement);
        modal.show();
    };

    const openModalUpdate = (plantId) => {
        setSelectedPlantId(plantId);
        const modalElement = document.getElementById("updatePlant");
        const modal = new Modal(modalElement);
        modal.show();
    };

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, []);


    const handleDeleteClick = (userId) => {
        setShowWarningDelete(true);
        setDeleteId(userId);
    };

    const closeDeleteWarning = () => {
        setShowWarningDelete(false);
    }

    return(
        <I18nextProvider i18n={i18n}>

            <div id ="employeePage">

                <div className="text" onMouseEnter={handleMouseEnter}>{t("employeePage.title")}</div>

                <div id="searchForm" style={{ display: showSearchForm ? 'block' : 'none' }} onMouseLeave={handleMouseLeave}>

                    <div className="btn-group dropdown">
                        <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" data-bs-trigger="hover" aria-expanded="false">
                            {buttonText}
                        </button>
                        <ul className="dropdown-menu">
                            <li><label className="dropdown-item" data-criteria="name" onClick={handleItemClick} >{t("employeePage.name")}</label></li>
                            <li><label className="dropdown-item"  data-criteria="type" onClick={handleItemClick} >{t("employeePage.type")}</label></li>
                            <li><label className="dropdown-item"  data-criteria="species" onClick={handleItemClick} >{t("employeePage.species")}</label></li>
                            <li><label className="dropdown-item"  data-criteria="carnivorous" onClick={handleItemClick} >{t("employeePage.carnivorous")}</label></li>
                            <li><label className="dropdown-item" data-criteria="zone" onClick={handleItemClick} >{t("employeePage.zone")}</label></li>
                        </ul>
                    </div>

                    <div id="input-container">
                        <div className="form-floating mb-3">
                            <input type="text"
                                   className="form-control"
                                   id="floatingInput"
                                   placeholder="name@example.com"
                                   value={filterValue}
                                   onChange={(event) => setFilterValue(event.target.value)}
                            ></input>
                            <label htmlFor="floatingInput">{t("employeePage.filter")}</label>
                        </div>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" style={{color: "#307853",}} onClick={handleFilterClick}
                        />

                    </div>

                    <div id="flagButtons" >

                        <span className="fi fi-ro" style={{ fontSize: '2rem', cursor: "pointer" }} onClick={() => handleLanguageChange('ro')}></span>
                        <span className="fi fi-us" style={{ fontSize: '2rem', cursor: "pointer" }} onClick={() => handleLanguageChange('en')}></span>
                        <span className="fi fi-es" style={{ fontSize: '2rem', cursor: "pointer" }} onClick={() => handleLanguageChange('es')}></span>
                        <span className="fi fi-fr" style={{ fontSize: '2rem', cursor: "pointer" }} onClick={() => handleLanguageChange('fr')}></span>

                    </div>

                </div>

                <div id="tableEmployee" style={{top: showSearchForm ? '30%' : '20%'}}>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "3%"}}>

                        <div style={{ display: "flex", alignItems: "center" }}>
                                <FontAwesomeIcon id="modal-icon" icon={faPlus} size="2xl" style={{ color: "white", cursor:"pointer" }} onClick={openModalAdd}/>
                            <span style={{ marginLeft: "10px", color: "white" }}>{t("employeePage.addPl")}</span>
                        </div>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Link to='/statsPlants' >
                                <FontAwesomeIcon icon={faChartSimple} size="xl" style={{color: "white",}} />
                            </Link>
                            <span style={{ marginLeft: "10px", color: "white" }}>{t("employeePage.stats")}</span>
                        </div>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <div>

                            <span style={{ marginLeft: "10px", color: "white" , cursor:"pointer"}}
                                  onClick={downloadCsvData}>
                                <FontAwesomeIcon icon={faFileCsv} size="lg" style={{color: "#ffffff",}} />
                                &nbsp;&nbsp;
                                CSV</span>
                        </div>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginLeft: "10px", color: "white" , cursor:"pointer"}}
                                  onClick={downloadTextData}>
                                <FontAwesomeIcon icon={faFileLines} size="lg" style={{color: "#ffffff",}} />
                                &nbsp;&nbsp;
                                txt</span>
                        </div>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <div>
                            <span style={{ marginLeft: "10px", color: "white", cursor:"pointer", marginBottom:"5%" }}
                                  onClick={downloadJsonData}>
                                <b style={{fontSize: "135%"}}>{"{ }"}</b>
                                &nbsp;&nbsp;
                                json
                            </span>
                        </div>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <div>

                            <span style={{ marginLeft: "10px", color: "white", cursor:"pointer" }}
                                  onClick={downloadXmlData}>
                                <FontAwesomeIcon icon={faCode} size="lg" style={{color: "#ffffff",}} />
                                &nbsp;&nbsp;
                                xml
                            </span>
                        </div>

                    </div>

                    <table className="table table-hover" style={{marginBottom: "5%"}}>

                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">{t("employeePage.name")}</th>
                            <th scope="col">{t("employeePage.type")}</th>
                            <th scope="col">{t("employeePage.species")}</th>
                            <th scope="col">{t("employeePage.carnivorous")}</th>
                            <th scope="col">{t("employeePage.zone")}</th>
                            <th scope="col">{t("employeePage.imageTH")}</th>
                            <th scope="col">{t("employeePage.operationTH")}</th>
                        </tr>
                        </thead>

                        <tbody>
                            {plants.map(plant => (
                                <tr key={plant.id}>
                                    <th scope="row">{plant.id}</th>
                                    <td>{plant.name}</td>
                                    <td>{plant.type}</td>
                                    <td>{plant.species}</td>
                                    <td>{plant.carnivorous}</td>
                                    <td>{plant.zone}</td>
                                    <td>
                                        {plant.image && (
                                            <img
                                                id="tabImg"
                                                src={`data:image/jpeg;base64, ${plant.image}`}
                                                alt={"plant "}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <FontAwesomeIcon icon={faPen}  style={{color: "white",}} onClick={() => openModalUpdate(plant.id)}/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <FontAwesomeIcon icon={faTrash}
                                                         onClick={() => handleDeleteClick(plant.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <AddPlant onPlantAdded={handlePlantAddedOrUpdated}/>

                <UpdatePlant id={selectedPlantId} onPlantUpdated={handlePlantAddedOrUpdated}/>

                {showWarningDelete ? (
                    <div id="warningDelete">
                        <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff0000"}} size="2xl" />
                        <p style={{marginTop: "5%"}}>{t("employeePage.deleteQuestion")} {deleteId} ?</p>

                        <div id="warningBttns">
                            <button type="button" class="btn btn-secondary" onClick={() => {
                                handeDeletePlant(deleteId);
                                closeDeleteWarning();
                            }}>{t("employeePage.deleteBttn")}</button>

                            <button type="button" className="btn btn-success" onClick={closeDeleteWarning}>{t("employeePage.quitDelete")}</button>
                        </div>

                    </div>
                ) : null}

            </div>

        </I18nextProvider>

    )
}
