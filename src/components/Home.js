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

export function Home({ user }) {
  return (
    <div>
      <Header />
      <button onClick={() => signOut(auth)}> Cerrar sesión</button>
     
      {user.rol == "user" && <UserView />} 
      {user.rol == "admin" && <AdminView /> } 
      
      <Footer />
    </div>
  );
}
export default Home;