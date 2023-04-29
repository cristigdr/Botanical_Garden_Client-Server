import 'bootstrap/dist/css/bootstrap.min.css';


import { useState } from 'react';

export default function Login(){

    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleMouseEnter = () => {
        setShowLoginForm(true);
    }

    const handleMouseLeave = () => {
        setShowLoginForm(false);
    }

    return (
        <div id="loginPage">

            <div id="container" onMouseEnter={handleMouseEnter}>

                <div id="text">Grădina Botanică Alexandru Borza</div>

                <div id="loginForm" style={{ display: showLoginForm ? 'block' : 'none' }} onMouseLeave={handleMouseLeave}>
                    <div id="credentials">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                            <label htmlFor="floatingInput">Nume utilizator</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                            <label htmlFor="floatingInput">Parolă</label>
                        </div>
                    </div>

                    <div id="buttonsLogin">
                        <button type="button" className="btn btn-success">Autentificare</button>
                        <button type="button" className="btn btn-success">Vizualizare ca vizitator</button>

                    </div>

                </div>
            </div>
        </div>
    )
}
