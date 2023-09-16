import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import escribirLog from "./escribirLog";

async function añadirRol(infoRol) {
  const firestore = getFirestore(firebaseApp);
  //const collectionRef = collection(db, "usuarios");
  //const docRef = doc(collectionRef, infoUsuario.id);
  //setDoc(docRef, infoUsuario);
 
  const auth = getAuth(firebaseApp);
  const docuRef = doc(firestore, "rol");
  setDoc(docuRef, { nombre: infoRol.correo, rol: infoRol.rol });

  //escribirLog("Creación", infoUsuario, autor);
}

export default añadirRol;
