import firebaseApp from "../firebase/credenciales";
import { getFirestore, deleteDoc, collection, doc, getDocs } from "firebase/firestore";
import escribirLog from "./escribirLog";
const db = getFirestore(firebaseApp);

export default async function eliminarProductoHome(infoUsuarios) {
  const coleccionRef = collection(db, "usuarios");
  const docuRef = doc(coleccionRef, infoUsuarios);
  const eliminado = await deleteDoc(docuRef);

  escribirLog("Eliminación", infoUsuarios);

  return eliminado;
}
