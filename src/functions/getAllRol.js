import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection,query, where, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default async function getRoles() {
  const roles =[];
    
  const nameRoles =[];


  const db = getFirestore(firebaseApp);

  const roleRef = collection(db, "rol");

const querySnapshot = await getDocs(roleRef);

querySnapshot.forEach((doc) => {

  // doc.data() is never undefined for query doc snapshots
  roles.push(doc.data());
  nameRoles.push(doc.data().nombre)
  //console.log(doc.data());
//console.log("acaa veo nutri despues de doc",nutri);
//console.log("variuable final",nameNutri)


// const promo=[{
 // text:nameNutri.correo
//}]
});
return nameRoles;
}
