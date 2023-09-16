import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default async function getAllRoles() {
  const roles = [];
  const collectionRef = collection(db, "rol");
  const snapshot = await getDocs(collectionRef);
  snapshot.forEach((doc) => {
    roles.push(doc.data());
  });
  return roles;
}
