import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "./credenciales";
import React, { useState, useEffect } from 'react';

import { getFirestore,doc,getDoc } from "firebase/firestore";




const firestore= getFirestore(firebaseApp);

const RequireAuth = ({ usuario,roles }) => {
    //tengo que ver como llamo a los roles aqui con el firevbase

    const location = useLocation();
  
    const auth = getAuth(firebaseApp);

    //const roleinfou=usuario.rol;
    //console.log("que tenemos en auth user firebase",auth.currentUser);
  //console.log("que tenemos el role del user en duro de app",roles);
//console.log("que tenemos el role del user firebase",roleinfou);


    return (
        usuario==null 
        ?<Navigate to="/login" state={{ from: location }} replace />
        :usuario.rol != roles || usuario.estado=='inactivo'
            ?<Navigate to="/unauthorized" state={{ from: location }} replace /> 
            :<Outlet />

    

            

            
    );
}

export default RequireAuth;