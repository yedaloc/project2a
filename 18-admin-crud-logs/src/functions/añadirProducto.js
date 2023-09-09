import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import escribirLog from "./escribirLog";

function añadirUsuario(infoUsuario, id) {
  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "usuarios");
  const docRef = doc(collectionRef, infoUsuario.id);
  setDoc(docRef, infoUsuario);

 // escribirLog("Creación", infoUsuario, id);
}

export default añadirUsuario;
