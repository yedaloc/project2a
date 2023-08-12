import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import escribirLog from "./escribirLog";

function editarProducto(infoProducto, correo) {
  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "usuarios");
  const docRef = doc(collectionRef, infoProducto.correo);
  setDoc(docRef, infoProducto);

  escribirLog("Edición", infoProducto, correo);
}

export default editarProducto;
