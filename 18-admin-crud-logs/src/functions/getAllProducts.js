import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default async function getAllProducts() {
  const usuarios = [];
  const collectionRef = collection(db, "usuarios");
  const snapshot = await getDocs(collectionRef);
  snapshot.forEach((doc) => {
    usuarios.push(doc.data());
  });
  return usuarios;
}
