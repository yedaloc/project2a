import firebaseApp from "../firebase/credenciales";
import { getFirestore, deleteDoc, collection, doc, /*getDocs,*/ /*setDoc*/ } from "firebase/firestore";
import escribirLog from "./escribirLog";
const db = getFirestore(firebaseApp);

/*export default async function eliminarProductoHome(infoUsuario, id) {
  const coleccionRef = collection(db, "usuarios");
  const docuRef = doc(coleccionRef, infoUsuario);
  const eliminado = await deleteDoc(docuRef);
  setDoc(eliminado, infoUsuario);

  escribirLog("Eliminación", infoUsuario.id);

  return eliminado;
}*/
const coleccionRef = collection(db, "usuarios");

export default async function eliminarProductoHome(infoUsuario, id,/*password*/) {
  try {
    await db.collection('usuarios').doc(id).delete();
    console.log(`Usuario con ID ${id} eliminado de Firebase`);
  } catch (error) {
    console.error('Error eliminando usuario de Firebase:', error);
  }

  
  const docuRef = doc(coleccionRef, infoUsuario);
  /*const eliminado = */await deleteDoc(docuRef);
  /*setDoc(/*eliminado, infoUsuario);*/

  escribirLog("Eliminación", infoUsuario.id);
}