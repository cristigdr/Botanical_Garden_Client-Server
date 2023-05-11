import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {I18nextProvider, useTranslation} from "react-i18next";
import i18n from '../i18n';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useNavigate } from 'react-router-dom';



export default function Login(){

    const { t } = useTranslation();
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setShowLoginForm(true);
    }

    const handleMouseLeave = () => {
        setShowLoginForm(false);
    }

    function handleLanguageChange(language) {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
    }

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, []);


    const handleLogin = () => {
        const url = `http://localhost:8080/getCredentials?name=${name}&password=${password}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data);

                document.cookie = `userData=${encodeURIComponent(JSON.stringify(data))}; secure`;

                if (data.role === 'administrator') {
                    navigate('/admin');
                } else if (data.role === 'angajat') {
                    navigate('/employee');
                }
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });
    };


    return (
        <I18nextProvider i18n={i18n}>

            <div id="loginPage">

                    <div className="text" onMouseEnter={handleMouseEnter}>{t("loginForm.title")}</div>

                    <div id="loginForm" style={{ display: showLoginForm ? 'block' : 'none' }} onMouseLeave={handleMouseLeave}>

                        <div id="credentials">
                            <div className="form-floating mb-3">
                                <input type="text"
                                       className="form-control"
                                       id="floatingInput"
                                       placeholder="name@example.com"
                                       value={name}
                                       onChange={e => setName(e.target.value)}
                                ></input>
                                <label htmlFor="floatingInput">{t("loginForm.username")}</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="password"
                                       className="form-control"
                                       id="floatingInput"
                                       placeholder="name@example.com"
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}
                                ></input>
                                <label htmlFor="floatingInput">{t("loginForm.password")}</label>
                            </div>
                        </div>

                        <div id="buttonsLogin" >
                            <button type="button"
                                    className="btn btn-success"
                                    onClick={handleLogin}
                            >{t("loginForm.loginButton")}</button>
                            <Link to='/guest' style={{width: "100%"}}>
                                <button type="button" className="btn btn-success">{t("loginForm.guestButton")}</button>
                            </Link>
                        </div>

                        <div id="flagButtons">

                            <span className="fi fi-ro" style={{ fontSize: '1.5rem', cursor: "pointer" }} onClick={() => handleLanguageChange('ro')}></span>
                            <span className="fi fi-us" style={{ fontSize: '1.5rem', cursor: "pointer" }} onClick={() => handleLanguageChange('en')}></span>
                            <span className="fi fi-es" style={{ fontSize: '1.5rem', cursor: "pointer" }} onClick={() => handleLanguageChange('es')}></span>
                            <span className="fi fi-fr" style={{ fontSize: '1.5rem', cursor: "pointer" }} onClick={() => handleLanguageChange('fr')}></span>

                        </div>
                    </div>
            </div>
        </I18nextProvider>

    )
}
