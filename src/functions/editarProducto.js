import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import obtenerUid from "../functions/obteneruid";
import escribirLog from "./escribirLog";

function añadirProducto(infoUsuario) {
  
  const db = getFirestore(firebaseApp);
  //const infoU = obtenerUid();

  const collectionRef = collection(db, "usuarios");
  console.log(infoUsuario.sku);
  const docuRef = doc(db, `usuarios/${infoUsuario.sku}`);
  updateDoc(docuRef, {  rol: infoUsuario.rol, nombre:infoUsuario.nombre});

 // escribirLog("Edición", infoProducto, autor);
}

export default añadirProducto;
