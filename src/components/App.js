import React from "react";
import Container from "react-bootstrap/Container";

import Home from "./Home";
import Login from "./Login";

import firebaseApp from "./credenciales";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getFirestore,doc,getDoc } from "firebase/firestore";

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

  function setUserWithFirebaseAndRol(usuarioFirebase){
    getRol(usuarioFirebase.uid).then((rol) =>{
      const userData= {
        uid: usuarioFirebase.uid,
        email:usuarioFirebase.email,
        rol:rol,
        estado:usuarioFirebase.estado,
      };
      setUsuario(userData);
      console.log("user data final",userData);
    });

  };

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {

      if  (!usuario){
        setUserWithFirebaseAndRol(usuarioFirebase);
      }

      //setUsuario(usuarioFirebase);
      console.log(usuarioFirebase);
    } else {
      setUsuario(null);
    }
  });

  return (
    <Container fluid>
      {usuario ? <Home usuario={usuario} /> : <Login />}
    </Container>
  );
}

export default App;
