import React, { useState } from "react";
import './Login.css';
import firebaseApp from "../firebase/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

function Login() {
  const firestore = getFirestore(firebaseApp);
  const [isRegistrando, setIsRegistrando] = useState(false);

  async function registrarUsuario(correo, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      correo,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: correo, rol: rol });
  }

  function submitHandler(e) {
    e.preventDefault();

    const correo = e.target.elements.correo.value;
    const password = e.target.elements.password.value;
    //const rol = e.target.elements.rol.value;

    console.log("submit", correo, password);

    if (isRegistrando) {
      // registrar
      registrarUsuario(correo, password);
    } else {
      
      //getrol

      const rol=
      // login

      signInWithEmailAndPassword(auth, correo, password);
    }
  }

  return (
    <div className="auth-form-container">
      <h1>{isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>

      <form className="login-form" onSubmit={submitHandler}>
        <label>
          Correo electrónico:
          <input type="email" id="correo" className="mb-1" />
        </label>

        <label>
          Contraseña:
          <input type="password" id="password" className="mb-1"/>
        </label>

        <input
          type="submit"
          value={isRegistrando ? "Registrar" : "Iniciar sesión"}
        />
      </form>

      <button onClick={() => setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
        
      </button>
    </div>
  );
}

export default Login;