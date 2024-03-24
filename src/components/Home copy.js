import React from 'react';
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import NutriView from "../components/Nutriview";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";
import UserApp from './UserApp';

const auth = getAuth(firebaseApp);

export function Home({ usuario }) {
  return (
    <div>
        
      <button onClick={() => signOut(auth)}> Cerrar sesión</button>
   
      {(() => {

        switch(usuario.rol){

          case 'admin':
            return <AdminView usuario={usuario} />
          case 'nutri':
            return <NutriView usuario={usuario} />
          case 'user':
            return <UserView />
          default : 
            return null
        }
      })()}
      
      
    </div>
  );
}
export default Home;