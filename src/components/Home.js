import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";


const auth = getAuth(firebaseApp);

export function Home({ usuario }) {

  const navigate = useNavigate();
  return (
    <section>
            <h1>Home</h1>

            <div className="flex-container padding-nav-cards">
          <div className="flex-item-card cards-color">
            <Link to="/user">
            <div>
                 <span className="material-icons md-80 center margin-card-title">face</span>
                    </div>
            <p className="center">Pagina Usuario</p>
              </Link>
          </div>    
            <br />
            <div className="flex-item-card cards-color">
            <Link to="/app/admin">
            <div>
                 <span className="material-icons md-80 center margin-card-title">face</span>
                 <p className="center">Pagina Administrador</p>
                    </div>
            </Link>
            </div>
            <div className="flex-item-card cards-color">
            <Link to="/nutri">
            <div>
                 <span className="material-icons md-80 center margin-card-title">face</span>
                 <p className="center">Pagina nutricionista</p>
                    </div>
            </Link>
            </div>
            </div>
            <div className="flexGrow">
            <button onClick={() => signOut(auth)}> Cerrar sesión</button>
            </div>
         
            
        </section>
  );
}
export default Home;