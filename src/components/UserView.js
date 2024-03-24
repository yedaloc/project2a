import React from "react";
import { Header } from './Header.js';
import { NavCards } from './NavCards.js';
import { Footer } from './Footer.js';
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../firebase/credenciales";
const auth = getAuth(firebaseApp);


function UserView({usuario}) {
  return (
    <div>
      <Header usuario={usuario}/>
      <button onClick={() => signOut(auth)}> Cerrar sesión</button>
      <NavCards />
      
      <Footer />
    </div>
  );
}

export default UserView;