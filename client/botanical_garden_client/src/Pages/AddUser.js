import {useEffect, useState} from "react";
import httpClient from "./httpClient";
import {I18nextProvider, useTranslation} from "react-i18next";
import i18n from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

export default function AddUser(){

    const { t } = useTranslation();
    const[addUserData, setAddUserData] = useState({
        user: "",
        password: "",
        role: "",
    });
    const [showMessageBox, setShowMessageBox] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        try {
            setSuccess(false);
            setShowMessageBox(false);
            const response = await httpClient.post("http://localhost:8080/insertUser", addUserData);
            console.log(response.data);

            if (response.status === 200) {
                setAddUserData({ user: "", password: "", role: "" });
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

        const backdrop = document.getElementById('addUser');
        backdrop.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            backdrop.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return(
        <I18nextProvider i18n={i18n}>

            <div className="modal fade" id="addUser" tabIndex="-1" aria-labelledby="addUserLabel"
                 aria-hidden="true">
                <div className="modal-dialog" style={{width: "fit-content"}}>
                    <div className="modal-content">
                        <div className="modal-header" >

                            <h1 className="modal-title fs-5" id="exampleModalLabel">{t("adminPage.addUser")}</h1>

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
                                            <p>{t("adminPage.errorMessAddUs")}</p>
                                            <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff0000"}} size="2xl" />

                                        </>
                                    )}
                                </div>
                            )}

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
                                        <label htmlFor="floatingInput"><strong>{t("adminPage.userName")}:</strong></label>
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
                                        <label htmlFor="floatingInput"><strong>{t("adminPage.password")}:</strong></label>
                                    </div>

                                    <li className="list-group-item">

                                        <strong>{t("adminPage.role")}:</strong> <br/>

                                        <label><input type="radio"
                                                      name="zone"
                                                      value={t("adminPage.adminData")}
                                                      checked={addUserData.role === t("adminPage.adminData")}
                                                      onChange={(e) => setAddUserData({ ...addUserData, role: e.target.value })}
                                        /> {t("adminPage.admin")}</label>

                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        <label><input type="radio"
                                                      name="zone"
                                                      value={t("adminPage.employeeData")}
                                                      checked={addUserData.role === t("adminPage.employeeData")}
                                                      onChange={(e) => setAddUserData({ ...addUserData, role: e.target.value })}
                                        /> {t("adminPage.employee")}</label>

                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                    </li>

                                    <button type="button"
                                            className="btn btn-success"
                                            style={{width: 'fit-content', margin: "5% auto"}}
                                            onClick={handleSubmit}
                                    >{t("adminPage.addUsBttn")}
                                    </button>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </I18nextProvider>
    )
}