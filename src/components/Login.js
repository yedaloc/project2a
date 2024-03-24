import React, { useState } from "react";
import './Login.css';
import firebaseApp from "../firebase/credenciales";
import { useNavigate } from "react-router-dom"
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

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol });
  }

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
   // const rol = e.target.elements.rol.value;

    console.log("submit", email, password);
      // login
      signInWithEmailAndPassword(auth, email, password).then((user) => {
        // Success...
        console.log(user)
        navigate('/')
        //...
    })
    .catch((error) => {
      // Error
      console.log(error)
  })
      console.log("logueado", email, password);
  }

  return (
    <div className="auth-form-container">
      <h1>{isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>

      <form className="login-form" onSubmit={submitHandler}>
        <label>
          Correo electrónico:
          <input required  className="email" type="email" id="email" />
        </label>

        <label>
          Contraseña:
          <input className="password" type="password" id="password" />
        </label>

        <input
          type="submit"
          value={"Iniciar sesión"}
        />
      </form>

    </div>
  );
}

export default Login;