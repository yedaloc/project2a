import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, getDocs,query } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default async function getAllNutri() {
  const nutri = [];
  const collectionRef = collection(db, "usuarios");
  const snapshot = await query(collectionRef, where("rol", "==", "nutri"));
  snapshot.forEach((doc) => {
    nutri.push(doc.data());
  });
  return nutri;
}
