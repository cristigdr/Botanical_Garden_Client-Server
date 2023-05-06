

export default function UpdateUser(){


    return(
        <div id ="adminPage">
            <div className="text" style={{ width: '60%'}}>Actualizare utilizator:</div>

            <div className="card" id="addUserCard" style={{ width: "18rem" }}>

                <ul className="list-group list-group-flush">

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                        <label htmlFor="floatingInput"><strong>Utilizator</strong></label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                        <label htmlFor="floatingInput"><strong>Parola</strong></label>
                    </div>

                    <li className="list-group-item">
                        <strong>Rol:</strong> <br/>
                        <label><input type="radio" name="zone" value="administrator" /> Administrator</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label><input type="radio" name="zone" value="angajat" /> Angajat</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </li>

                    <button type="button" className="btn btn-success" style={{width: 'fit-content', margin: "5% auto"}}>Actualizare</button>

                </ul>
            </div>

        </div>
    )
}