import firebaseApp from "../credenciales";
import { getFirestore, collection,query, where, getDocs,getDoc,doc } from "firebase/firestore";



//aca lo que tengo que obtener es el nombre
 async function ObtenerAgenda(id) {

  const agenda =[];
  
 const nameAgenda =[];


 const db = getFirestore(firebaseApp);

  const nutriRef = doc(db, 'agenda',id);

  const q = query(nutriRef);

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

      // doc.data() is never undefined for query doc snapshots
      agenda.push(doc.data());
      //nameNutri.push(doc.data().c)
      //console.log(doc.data());
    // console.log("acaa veo nutri despues de doc",nutri);
    //console.log("variuable final",nameNutri)
    });

    

    
    
    
  return agenda;
}

export default ObtenerAgenda;