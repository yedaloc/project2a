import React, { useState, useEffect } from 'react'
import { Container, Stack, Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import Inicio from './Inicio';

import TimePicker from 'react-time-picker';

import { collection, deleteDoc, getDocs, getFirestore,getDoc,doc, updateDoc } from "firebase/firestore";
import Table from 'react-bootstrap/Table'
import firebaseApp from '../credenciales';
//import { async } from '@firebase/util';
import { AiOutlineClose, AiFillEdit, AiOutlineCheck } from 'react-icons/ai';
import actualizaragendamieto from './actualizaragendamiento';
import ObtenerAgenda from './obteneragendabyid';
import ModalEditarTurnos from './ModaleditarTurnos';



function Turnos() {
    const estilo = {
        width: '90%',
        margin: '0 auto',

    };
    const [user, setuser] = useState([]);
    const [editar, seteditar] = useState(false);
    const [buscar, setBuscar] = useState('');
    const [turnoEditar, setTurnoEditar] = React.useState(null);
    const [isModalEditar, setIsModalEditar] = React.useState(false);


    useEffect(() => {
       
       
        const getAgenda = async () => {

            const db = getFirestore(firebaseApp);
            const { docs } = await getDocs(collection(db, 'agenda'));
            const nArray = docs.map(agenda => ({ id: agenda.id, ...agenda.data() }));
            setuser(nArray);
            console.log(nArray)
            console.log("paso para obtener datos de agenda")
        }
        getAgenda();
    }, [])

    const borrarTurno = async (id) => {
        const db = getFirestore(firebaseApp);
        const docuRef = doc(db, 'agenda',id);
        const iestado="Cancelado"
        try {
            await updateDoc(docuRef, { estado:iestado});
            const { docs } = await getDocs(collection(db, 'agenda')); // se vuelve a colocar lo del'GET AGENDA' para recargar la lista
            const nArray = docs.map(agenda => ({ id: agenda.id, ...agenda.data() }));
            setuser(nArray);
        } catch (error) {
            console.log(error);
        }
    }

    const actualizar = async (id) => {
        seteditar(true);
        console.log(id,"imprme eluser que va a actualizar");
        //const turnel = ObtenerAgenda(id);
        //console.log(turnel,"datos de agenda");
         const infoTurno = {
            id: id.id,
            fecha: id.fecha,
            turno:id.turno
          }
          console.log(infoTurno,"datos de agenda");
        actualizaragendamieto(infoTurno);

    }
 console.log(user);

    useEffect(() => {
        const cerrar = () =>{
            if (user.length === 0) {
                seteditar(false)
    
            } else {
                
    
            }
        }
        cerrar();
        
    })
    const cerrarModal = () =>{
        seteditar(false);
    }


    return (
        <Container fluid>
        <div>
            <Inicio />
            <div style={estilo}>


                <div className='table-responsive' >
                    <Table striped bordered hover size="sm" className='mx-auto' >
                        <thead>
                            <tr>

                                <th scope='col' className='text-center'>Paciente</th>
                                <th scope='col' className='text-center'>Telefono</th>
                                <th scope='col' className='text-center'>Nutricionista</th>
                                <th scope='col' className='text-center'>Fecha</th>
                                <th scope='col' className='text-center'>Horario</th>
                                <th scope='col' className='text-center'>Estado</th>
                                <th scope='col' className='text-center' colSpan={2}> Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.length !== 0 ? (

                                    user.map(user => (



                                        <tr key={user.id}>

                                            <td className='text-center'>{user.nombre}</td>
                                            <td className='text-center'>{user.tel}</td>
                                            <td className='text-center'>{user.promocion}</td>

                                            <td className='text-center'>{user.fecha}</td>
                                            <td className='text-center'>{user.turno}</td>
                                            <td className='text-center'>{user.estado}</td>

                                            <td className='text-center'><Button onClick={(id) => { setTurnoEditar({ ...user });
                                                                  setIsModalEditar(true); }} className='btn btn-warning btn-sm'><AiFillEdit />Reagendar</Button></td>
                                            <td className='text-center' onClick={(id) => { borrarTurno(user.id) }}><Button className='btn btn-danger btn-sm'><AiOutlineClose />Cancelar Cita</Button></td>



                                        </tr>



                                    ))




                                )

                                    :
                                    <tr>
                                        <td colSpan={7} className="text-center"> NO HAY TURNOS AGENDADOS</td>
                                    </tr>
                            }
                        </tbody>
                    </Table>
                </div>
                
                {turnoEditar && (
                    <ModalEditarTurnos
                        isModalEditar={isModalEditar}
                        setIsModalEditar={setIsModalEditar}
                        turnoEditar={turnoEditar}
                        setTurnoEditar={setTurnoEditar}
                        user={user}
                    />
             )}
            </div>
            
        </div >
    </Container>    
        
    )
}

export default Turnos
