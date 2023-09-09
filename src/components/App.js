import React from "react";
import Container from "react-bootstrap/Container";

import Home from "./Home";
import Login from "./Login";

import firebaseApp from "./credenciales";

import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {
  const [usuario, setUsuario] = React.useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase);
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
