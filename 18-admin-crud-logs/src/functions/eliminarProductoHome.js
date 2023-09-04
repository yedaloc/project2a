import firebaseApp from "../firebase/credenciales";
import { getFirestore, deleteDoc, collection, doc, getDocs } from "firebase/firestore";
import escribirLog from "./escribirLog";
import { getAuth, deleteUser } from "firebase/auth";


const db = getFirestore(firebaseApp);

export default async function eliminarProductoHome(infoUsuarios) {

  const coleccionRef = collection(db, "usuarios");
  const docuRef = doc(coleccionRef, infoUsuarios.id);
  //deleteUser(user.uid);
  console.log(docuRef);
  const eliminado = await deleteDoc(docuRef);

  //escribirLog("Eliminación", infoUsuarios);

  return eliminado;
}
