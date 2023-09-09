import React, { useState, useEffect,useContext } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

import { AboutUs } from './AboutUs.js';
import { Home } from './Home.js';
import { NavBar } from './NavBar.js';
import { BMICalculator } from './BMICalculator.js';
import { MakeMyDietPlan } from './MakeMyDietPlan.js';
import { ViewMyDietPlan } from './ViewMyDietPlan.js';
import { AddFoodToDatabase } from './AddFoodToDatabase.js'
import "./style/dark.scss";
//import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import List from "./list/List";
import Single from "./single/Single";
import New from "./new/New";
import './Login.css'
import firebaseApp from "./credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
function App(props) {
  const { darkMode } = useContext(DarkModeContext);

  const [usuario, setUsuario] = useState(null);
  const firestore = getFirestore(firebaseApp);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUsuario(userData);
      console.log("userData final", userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //funcion final

      if (!usuario) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUsuario(null);
    }
  });

  return <div className="App">{usuario ? <Home usuario={usuario} /> : <Login />}</div>;

}

export default App;