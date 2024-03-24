import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, setDoc,addDoc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import escribirLog from "./escribirLog";

async function inactivarEstadoUsuarios(infoEstado) {
  const firestore = getFirestore(firebaseApp);
  
 console.log(infoEstado)

  const iestado="inactivo"
  const docuRef = doc(firestore, `usuarios/${infoEstado.sku}`);
  updateDoc(docuRef, { estado: iestado });
}

export default inactivarEstadoUsuarios;