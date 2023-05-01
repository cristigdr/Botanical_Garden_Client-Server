import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

export default function AddPlant(){

    return(
        <div id ="employeePage">
            <div className="text" style={{ width: '50%'}}>Adaugare planta:</div>

            <div className="card" id="addPlantCard" style={{ width: "18rem" }}>
                <div className="card-body" >
                    <label htmlFor="image-upload" className="custom-file-upload">
                        <FontAwesomeIcon icon={faPlus} size="2xl" /> <br/>
                    </label>
                    <p> Incarca o imagine </p>
                    <input id="image-upload" type="file" style={{ display: "none" }}/>
                </div>
                <ul className="list-group list-group-flush">

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                        <label htmlFor="floatingInput"><strong>Denumire</strong></label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                        <label htmlFor="floatingInput"><strong>Tip</strong></label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                        <label htmlFor="floatingInput"><strong>Specie</strong></label>
                    </div>

                    <li className="list-group-item">
                        <strong>Planta carnivora:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="checkbox" />
                    </li>

                    <li className="list-group-item">
                        <strong>Zona gradina botanica:</strong> <br/>
                        <label><input type="radio" name="zone" value="A" /> A</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label><input type="radio" name="zone" value="B" /> B</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label><input type="radio" name="zone" value="C" /> C</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label><input type="radio" name="zone" value="D" /> D</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </li>

                    <button type="button" className="btn btn-success" style={{width: '35%', margin: "5% auto"}}>Adaugare</button>

                </ul>
            </div>



        </div>
    )
}