import {useState} from "react";
import httpClient from "./httpClient";
import {I18nextProvider, useTranslation} from "react-i18next";
import i18n from "../i18n";

export default function AddUser(){

    const { t } = useTranslation();
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
        <I18nextProvider i18n={i18n}>

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
                    >{t("adminPage.addUsBttn")}</button>

                </ul>
            </div>
        </I18nextProvider>
    )
}