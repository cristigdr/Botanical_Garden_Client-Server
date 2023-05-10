import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import httpClient from "./httpClient";
import AddUser from "./AddUser";
import {Modal} from "bootstrap";
import UpdateUser from "./UpdateUser";
import {I18nextProvider, useTranslation} from "react-i18next";
import i18n from "../i18n";

export default function Admin(){

    const { t } = useTranslation();
    const [buttonText, setButtonText] = useState('Tip Utilizator');
    const[users, setUsers] = useState([]);
    const [showSearchForm, setshowSearchForm] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);



    function handleItemClick(event) {
        setButtonText(event.target.innerText);
        setSelectedRole(event.target.innerText);
    }



    const handleMouseEnter = () => {
        setshowSearchForm(true);
    }


    const handleMouseLeave = () => {
        setshowSearchForm(false);
    }


    useEffect( () =>{
        async function fetchAllUsers(){
            try{
                const response = await httpClient.get('http://localhost:8080/getUsers');
                setUsers(response.data);
            }catch (error){
                console.error(error);
            }
        }
        fetchAllUsers();
    }, []);


    const handleDeleteUser = async (id) => {
        try {
            await httpClient.delete(`http://localhost:8080/deleteUser/${id}`);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    async function handleFilterUsers(role) {
        try {
            const response = await httpClient.get(`http://localhost:8080/findRoles/${role}`);
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (selectedRole) {
            handleFilterUsers(selectedRole);
        }
    }, [selectedRole]);


    function handleLanguageChange(language) {
        i18n.changeLanguage(language);
    }


    const openModalAdd = () => {
        const modalElement = document.getElementById("addUser");
        const modal = new Modal(modalElement);
        modal.show();
    };

    const openModalUpdate = (userId) => {
        setSelectedUserId(userId);
        const modalElement = document.getElementById("updateUser");
        const modal = new Modal(modalElement);
        modal.show();
    };
    return(
        <I18nextProvider i18n={i18n}>

            <div id ="adminPage">

                <div className="text" onMouseEnter={handleMouseEnter}>{t("adminPage.title")}</div>

                <div id="searchForm" style={{ display: showSearchForm ? 'block' : 'none' , top: '20%'}} onMouseLeave={handleMouseLeave}>

                    <label style={{color: 'white', marginBottom: '2%'}}><strong>{t("adminPage.filterUsers")}</strong></label>

                    <div className="btn-group dropdown">

                        <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" data-bs-trigger="hover" aria-expanded="false">
                            {buttonText}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={handleItemClick}>{t("adminPage.admin")}</a></li>
                            <li><a className="dropdown-item" href="#" onClick={handleItemClick}>{t("adminPage.employee")}</a></li>
                        </ul>

                    </div>
                    
                    <div id="flagButtons" >

                        <span className="fi fi-ro" style={{ fontSize: '2rem', cursor: "pointer" }} onClick={() => handleLanguageChange('ro')}></span>
                        <span className="fi fi-us" style={{ fontSize: '2rem', cursor: "pointer" }} onClick={() => handleLanguageChange('en')}></span>
                        <span className="fi fi-es" style={{ fontSize: '2rem', cursor: "pointer" }} onClick={() => handleLanguageChange('es')}></span>
                        <span className="fi fi-fr" style={{ fontSize: '2rem', cursor: "pointer" }} onClick={() => handleLanguageChange('fr')}></span>

                    </div>

                </div>

                <div id="tableEmployee" style={{top: showSearchForm ? '20%' : '20%'}}>


                        <table className="table table-hover">
                            <thead>

                                <div style={{ display: "flex", alignItems: "center" }}>
                                        <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "white", cursor: "pointer" }} onClick={openModalAdd}/>
                                    <span style={{ marginLeft: "10px", color: "white" }}>{t("adminPage.addUser")}</span>
                                </div>


                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">{t("adminPage.userName")}</th>
                                    <th scope="col">{t("adminPage.password")}</th>
                                    <th scope="col">{t("adminPage.role")}</th>
                                    <th scope="col">{t("adminPage.operations")}</th>
                                </tr>

                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.user}</td>
                                        <td>{user.password}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPen}  style={{color: "white",}} onClick={() => openModalUpdate(user.id)}/>

                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                            <FontAwesomeIcon icon={faTrash}
                                                             onClick={() => handleDeleteUser(user.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                </div>

                <div className="modal fade" id="addUser" tabIndex="-1" aria-labelledby="addUserLabel"
                     aria-hidden="true">
                    <div className="modal-dialog" style={{width: "fit-content"}}>
                        <div className="modal-content">
                            <div className="modal-header" >
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{t("adminPage.addUser")}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <AddUser/>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="updateUser" tabIndex="-1" aria-labelledby="updateUserLabel"
                     aria-hidden="true">
                    <div className="modal-dialog" style={{width: "fit-content"}}>
                        <div className="modal-content">
                            <div className="modal-header" >
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{t("adminPage.updateUser")}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <UpdateUser id={selectedUserId} />

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </I18nextProvider>
    )
}