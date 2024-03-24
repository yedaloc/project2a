import {app} from '../firebaseconfig'
import { getFirestore, collection,query, where, getDocs } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";


//aca lo que tengo que obtener es el nombre
 async function ObtenerNutri() {

  const nutri =[];
  
 const nameNutri =[];


 const db = getFirestore(app);

  const nutriRef = collection(db, "usuarios");

  const q = query(nutriRef,where("rol","==","nutri"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

      // doc.data() is never undefined for query doc snapshots
      nutri.push(doc.data());
      nameNutri.push(doc.data().nombre)
      //console.log(doc.data());
    // console.log("acaa veo nutri despues de doc",nutri);
    console.log("variuable final",nameNutri)
    });

    

    
    
    
  return nameNutri;
}

export default ObtenerNutri;