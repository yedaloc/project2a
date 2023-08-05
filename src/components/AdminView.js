import React, { useEffect } from "react";
import {useState} from "react"
import {getUsername, saveUserName} from "../api"

function AdminView() {
  return <div>Hola, admin</div>;

  const [userName,setUserName]= useState(null);
  const [users, setUsers] = useState(null);

  const saveUser = ()=> {
    saveUserName(userName);
  }

  
  useEffect(()=>{
    getUsernameData();

},[])
  const getUsernameData = async()=>{
    const p = await getUsername();
    console.log(p);
    setUsers(p);
  }


return(
    <div className="AdminView">
        <input type="text" onChange={e => setUserName(e.target.value)}/><button onClick={saveUser}>Guardar</button>
    </div>
);


}

export default AdminView;