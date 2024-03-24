import React from "react";
import Container from "react-bootstrap/Container";

import Home from "./Home";
import Login from "./Login";

import firebaseApp from "./credenciales";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getFirestore,doc,getDoc } from "firebase/firestore";

import UserApp from "./UserApp";

const auth = getAuth(firebaseApp);
const firestore= getFirestore(firebaseApp);

function App() {


  const [usuario, setUsuario] = React.useState(null);


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
    });
    
  });

  };

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      

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

  return (
    <Container fluid>
      <UserApp/>
      {(usuario) ? <Home usuario={usuario} /> : <Login />}
      
    </Container>

    
  );
}

export default App;
