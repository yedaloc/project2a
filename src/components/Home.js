import React from 'react';
import { Header } from './Header.js';
import { NavCards } from './NavCards.js';
import { Footer } from './Footer.js';
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import NutriView from "../components/Nutriview";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";
import App from "../components/App"
const auth = getAuth(firebaseApp);

export function Home({ usuario }) {
  return (
    <div>
        <Header usuario={usuario} />
      <button onClick={() => signOut(auth)}> Cerrar sesión</button>
    
      
      {usuario.rol == "admin" ? <AdminView usuario={usuario}/> :<UserView /> } 
    
        
      <Footer />
    </div>
  );
}
export default Home;