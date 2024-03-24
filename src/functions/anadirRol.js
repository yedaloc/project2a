import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, setDoc,addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import escribirLog from "./escribirLog";

async function añadirRol(infoRol) {
  const firestore = getFirestore(firebaseApp);
  


  const docuRef = collection(firestore, "rol");
  addDoc(docuRef, { nombre: infoRol.nombre, rol: infoRol.descripcion,sku: infoRol.sku});
}

export default añadirRol;
