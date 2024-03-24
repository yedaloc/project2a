import React, { useState,useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import Inicio from './Inicio';
import TimePicker from 'react-time-picker';
import { async } from '@firebase/util';
import props from 'prop-types';

import Alert from 'react-bootstrap/Alert'
//import ObtenerNutri from './obtenerNutri';
//import ObtenerNutriQ from './obtenerNutriQ';
import firebaseApp from '../credenciales';
import { getFirestore, collection,query,addDoc, where, getDocs } from "firebase/firestore";

///crear SKU de agenda
  function Agendar() {
    const estilo = {
        width: '50%',
        margin: '0 auto',
        marginTop: '50px',
    };
    const store = getFirestore();
    const [cliente, setCliente] = useState('');
    const [telefono, setTelefono] = useState('');
    const [promo, setPromo] = React.useState('');
    const [infopromo, setinfoPromo] = React.useState('');
    const [val, setVal] = React.useState([]);
    const [servicio, setServicio] = useState('');
    const [fecha, setFecha] = useState('');
    const [alerta, setAlerta] = useState(false);
    const [turno, setTurno] = useState('10:00');
    const [error, setError] = useState(false);
   // const [nutri, setNutri] = React.useState('');

    const nCliente = {
        nombre: cliente,
        tel: telefono,
        promocion: promo,
        servicio: servicio,
        fecha: fecha,
        turno: turno,
        estado:"Agendado"
    };

    const agendar = async (e) => {
        e.preventDefault();
        if (cliente == '' || telefono == '' || promo == '' || fecha == '' || turno == '') {
            setError(true);
        } else {
            try {

                const data = await addDoc(collection(store, 'agenda'), {  nombre: cliente,
                    tel: telefono,
                    promocion: promo,
                    servicio: servicio,
                    fecha: fecha,
                    turno: turno,
                    estado:"Agendado", });
                console.log('Agregado', data.id);
                setAlerta(true);

            } catch (error) {
                console.log(error);
            }

            setCliente('');
            setTelefono('');
            setPromo('');
            setServicio('');
            setFecha('');
            setTurno('');
            setTimeout(() => {
                setAlerta(false);
            }, 3000);
        }

    };

     
    //console.log("obtenemos nurtri aqui",obtenernutri)     
   // console.log("entra aqui") ;
   //const promo=["nutri1","nutri2"];
    


   async function ObtenerNutri() {
        const nutri =[];
    
        const nameNutri =[];
  
  
        const db = getFirestore(firebaseApp);
  
        const nutriRef = collection(db, "usuarios");
  
        const q = query(nutriRef,where("rol","==","nutri"));
  
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
  
        // doc.data() is never undefined for query doc snapshots
        nutri.push(doc.data());
        nameNutri.push(doc.data().nombre)
        //console.log(doc.data());
      //console.log("acaa veo nutri despues de doc",nutri);
      //console.log("variuable final",nameNutri)
      
      
      // const promo=[{
       // text:nameNutri.correo
      //}]
 

      });

      return Promise.resolve(1).then(() => nameNutri);
    }

   // useEffect(() => {
     //infopromo =  ObtenerNutri();
     //console.log("repite infopromo que trae ahora",infopromo);
   // }, [])

      //function selectHandler(e) {

        //console.log("entra aqui")
        //e.preventDefault();

       const nutri=ObtenerNutri();
        //setNutri(nutri);

        //var data=''

        const [data, setData] = React.useState([]);

        var infodata=''

        Promise.resolve(nutri).then(value=>{
           // console.log('value: yeda :',value)
            //data=value;
            
            setData(value);


            }) 
       // console.log('data: yeda :',data)
           // data = Array.from(props.infodata);
    
           const options = data.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            )
          })

       //console.log("obtenemos nutri 1703",nutri); 
       //console.log("obtenemos nutri 1703 que deberia ser array",data); 
      //  setVal(e.target.value);
      //  promo=["nutri1","nutri2"];
          //  setPromo(promo);
       //     console.log("o btenemos los nutri",promo); 

           // return promo;
    //  }
// debido a que se ve como nutricionista deberia de poder elegir el cliente sacando el mismo fomrs select 
    return (

        <div>
            <Inicio />
            <div style={estilo}>
                {
                    alerta ?
                        <Alert variant="primary">
                            <span>Turno Agregado</span>
                        </Alert>
                        :
                        <span></span>
                }
            </div>
            
                <Form onSubmit={agendar}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre del Cliente</Form.Label>
                        <Form.Control value={cliente} type="text" placeholder="Paciente" onChange={(e) => { setCliente(e.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Número de Telefono</Form.Label>
                        <Form.Control value={telefono} type="text" placeholder="09XX XXX XXX" onChange={(e) => { setTelefono(e.target.value) }} />
                    </Form.Group>
                    <div className='row'>
                        <div className='col'>
                        <Form.Label>Nutricionista</Form.Label>
                            <Form.Control as="select" value={promo} onChange={(e) => { setPromo(e.target.value) }}>
		                    { /*<option>--- elige nutricionista ---</option>
                                <option value="nutri 1">nutri 1</option>
                                <option value="nutri 2">nutri 2</option>
                                <option value="nutri 3">nutri 3</option> */}

                           {/* unaforma1 {data.map(opt => (
                                <option value={opt.value}>{opt.value}</option>
                           ))} terminaca unaforma1*/}

                                    {options}
                            
                            </Form.Control>
                        </div>



                    </div>
                    <br></br>
                    <Form.Group controlId="duedate">
                        <Form.Control value={fecha} type="date" name="duedate" placeholder="Fecha" onChange={(e) => { setFecha(e.target.value) }} />
                    </Form.Group>
                    
                    <div className='row'>
                        <div className='col'>
                        <Form.Label>Horario</Form.Label>
                            <Form.Select value={turno} aria-label="Default select example" onChange={(e) => { setTurno(e.target.value) }}>
		                     <option>--- elige turno ---</option>
                                <option value="08:00"> 08:00</option>
                                <option value="08:30"> 08:30</option>
                                <option value="09:00"> 09:00</option>
                            
                            </Form.Select>
                        </div>



                    </div>

                    <div>
                        {
                            error ?
                                <div><Alert variant="danger">
                                    <span>ERROR! Faltan completar campos</span>
                                </Alert></div>
                                :
                                <span></span>

                        }
                    </div>
                    <Button type="submit" >Agendar Turno</Button>

                </Form>
            </div>
    



    );
}

export default Agendar