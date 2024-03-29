import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import { getDatabase, ref, onValue } from 'firebase/database';

import Home from "./Home";
import Login from "./Login";

import firebaseApp from "./credenciales";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getFirestore,doc,getDoc } from "firebase/firestore";
import { AboutUs } from './AboutUs.js';
import { BMICalculator } from './BMICalculator.js';


import { NavBar } from './NavBar.js';
import { Routes, Route } from 'react-router-dom';

import UserView from './UserView';
import AdminView from './AdminView';
import NutriView from './Nutriview';
import RequireAuth from './RequireAuth.js';
import Layout from './Layout';
import Missing from './Missing';
import Unauthorized from './Unauthorized';
import { MakeMyDietPlan } from './MakeMyDietPlan.js';
import { ViewMyDietPlan } from './ViewMyDietPlan.js';
// import AgendarCita from './Agendarcita';
import Successfull from './Successfull';
import Turnos from './turnos/Turnos';
import Agendar from './turnos/Agendar';

const auth = getAuth(firebaseApp);
const firestore= getFirestore(firebaseApp);

function App() {


  const [usuario, setUsuario] = React.useState(null);
  const [addedCustomizedFoodArray, setAddedCustomizedFoodArray] = useState([]);


  async function getRol(uid){
    const docuRef = doc(firestore,`usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;

  }

  async function getEstado(uid){
    const docuRef = doc(firestore,`usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().estado;
    return infoFinal;

  }

  function setUserWithFirebaseAndRol(usuarioFirebase){
    
    

    
    getRol(usuarioFirebase.uid).then((rol) =>{
      getEstado(usuarioFirebase.uid).then((infoestado)=>{
      const userData= {
        uid: usuarioFirebase.uid,
        email:usuarioFirebase.email,
        estado:infoestado,
        rol:rol,
      };
       setUsuario(userData);
      console.log("user data final",userData);
      console.log("user data final insertado",usuario);
    });
    
  });

  };

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      
      console.log("user data final insertado",usuario);

      if  (!usuario){
        //console.log("aqui veo este usuario en app",usuario);
        setUserWithFirebaseAndRol(usuarioFirebase);
        
      }

      //setUsuario(usuarioFirebase);
      //console.log(usuarioFirebase);
    } else {

      setUsuario(null);
    }
  });
 
  const ROLES = {
    'user': "user",
    'nutri': "nutri",
    'admin': "admin"
  }

  console.log("el usuario de appjs",usuario);

  const [stateData, setStateData] = useState([]);
  useEffect(() => {
    fetch('./data/common_foods.json') //send AJAX request
      .then((response) => response.json())
      .then((data) => {
        setStateData(data) //assign data to state
      })
      .catch((error) => {
        console.log("Error Reading data: " + error);
      })

  }, [])
  const combinedFoodData = stateData.concat(addedCustomizedFoodArray);


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
         {/* rutas publicas */}
         <Route path="login" element={<Login />} />
         <Route path="unauthorized" element={<Unauthorized />} />
         <Route path="about" element={<AboutUs />} />
         <Route path="bmicalculator" element={<BMICalculator />} />
         <Route path="makeplan" element={<MakeMyDietPlan foodData={combinedFoodData}/>} />
         <Route path="viewplan" element={<ViewMyDietPlan foodData={combinedFoodData}/>} />
         <Route path="agendarcita" element={<Agendar/>} />
         <Route path="success" element={<Successfull/>} />
         <Route path="/turnos" element={<Turnos/>} />

        
              <Route path="/" element={<Home usuario={usuario}/>} />



  {/* rutas protegidas */}
          <Route element={<RequireAuth usuario={usuario} roles={[ROLES.admin]}/>}>
              <Route path="app/admin" element={<AdminView usuario={usuario} />} />
          </Route>

          <Route element={<RequireAuth roles={[ROLES.nutri]} usuario={usuario}  />}>
              <Route path="nutri" element={<NutriView usuario={usuario} />} />
          </Route>

          <Route element={<RequireAuth roles={[ROLES.user]} usuario={usuario} />}>
              <Route path="user" element={<UserView usuario={usuario} />} />
          </Route>

          

          



          {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
