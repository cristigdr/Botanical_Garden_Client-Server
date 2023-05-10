import {useEffect, useState} from "react";
import httpClient from "./httpClient";
import {I18nextProvider, useTranslation} from "react-i18next";
import i18n from "../i18n";

export default function UpdateUser({ id }){

    const { t } = useTranslation();
    const [userData, setUserData] = useState({
        name: '',
        password: '',
        role: '',
    });



    useEffect(() => {
        async function fetchUser(){
            try {
                const response = await httpClient.get(`http://localhost:8080/getUser/${id}`);
                setUserData(response.data);

            } catch (error) {
                console.error(error);
            }
        }fetchUser();
    }, [id]);

    const handleSubmit = async () => {
        try {
            const response = await httpClient.put(
                "http://localhost:8080/updateUser",
                userData
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <I18nextProvider i18n={i18n}>

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

        </I18nextProvider>
    )
}