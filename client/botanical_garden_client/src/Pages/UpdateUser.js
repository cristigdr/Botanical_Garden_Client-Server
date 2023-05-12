import {useEffect, useState} from "react";
import httpClient from "./httpClient";
import {I18nextProvider, useTranslation} from "react-i18next";
import i18n from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

export default function UpdateUser({  onUserUpdated, id }){

    const { t } = useTranslation();
    const [userData, setUserData] = useState({
        id: "",
        name: '',
        password: '',
        role: '',
    });

    const [showMessageBox, setShowMessageBox] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function fetchUser(){
            try {
                const response = await httpClient.get(`http://localhost:8080/getUser/${id}`);
                setUserData(response.data);

                if (response.status === 200) {
                }
            } catch (error) {
                console.error(error);

            }
        }fetchUser();
    }, [id]);



    const handleSubmit = async () => {
        setSuccess(false);
        setShowMessageBox(false);
        try {
            const response = await httpClient.put(
                "http://localhost:8080/updateUser",
                userData
            );
            console.log(response.data);
            if (response.status === 200) {
                setSuccess(true);
                setShowMessageBox(true);
                onUserUpdated();

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

        const backdrop = document.getElementById('updateUser');
        backdrop.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            backdrop.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return(
        <I18nextProvider i18n={i18n}>

            <div className="modal fade" id="updateUser" tabIndex="-1" aria-labelledby="updateUserLabel"
                 aria-hidden="true">
                <div className="modal-dialog" style={{width: "fit-content"}}>
                    <div className="modal-content">

                        <div className="modal-header" >
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{t("adminPage.updateUser")}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={handleClick}></button>
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

                            <div className="card" style={{ width: "18rem" }}>

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
                                        <label htmlFor="floatingInput"><strong>{t("adminPage.userName")}:</strong></label>
                                    </div>

                                    <div className="form-floating mb-3">

                                        <input type="text"
                                               className="form-control"
                                               id="floatingInput"
                                               placeholder="name@example.com"
                                               value={userData.password}
                                               onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                        ></input>
                                        <label htmlFor="floatingInput"><strong>{t("adminPage.password")}:</strong></label>
                                    </div>

                                    <li className="list-group-item">

                                        <strong>{t("adminPage.role")}:</strong> <br/>

                                        <label>
                                            <input
                                                type="radio"
                                                name="zone"
                                                value={t("adminPage.adminData")}
                                                checked={userData.role === t("adminPage.adminData")}
                                                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                                            /> {t("adminPage.admin")}
                                        </label>

                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        <label>
                                            <input
                                                type="radio"
                                                name="zone"
                                                value={t("adminPage.employeeData")}
                                                checked={userData.role === t("adminPage.employeeData")}
                                                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                                            /> {t("adminPage.employee")}
                                        </label>

                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </li>

                                    <button type="button"
                                            className="btn btn-success"
                                            style={{width: 'fit-content', margin: "5% auto"}}
                                            onClick={handleSubmit}
                                    >{t("adminPage.updateUsBttn")}</button>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </I18nextProvider>
    )
}
