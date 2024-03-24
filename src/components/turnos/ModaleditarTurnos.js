import React from "react";

import { Modal, Stack, Form, Button } from "react-bootstrap";


import { getAuth, getUserByEmail } from "firebase/auth";
import firebaseApp from "../credenciales";

import { getFirestore, collection, doc, setDoc, getDoc, query, where, limit } from "firebase/firestore";

import actualizaragendamieto from "./actualizaragendamiento";

const auth = getAuth(firebaseApp);
function ModalEditarTurnos({
    isModalEditar,
    setIsModalEditar,
    actualizarEstadoTurnos,
    turnoEditar,
    setTurnoEditar,
    user,
}) {
  function editarProductoModal() {
    //obtener infor del formulario
    //const id = document.getElementById("id").value;
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const nutri = document.getElementById("nutri").value;
    const fecha = document.getElementById("fecha").value;
    const turno = document.getElementById("turno").value;
    
    //obtener id del agendamiento
    console.log("deberia de ser el id del agendamiento",turnoEditar.id)

    const id = turnoEditar.id;
    const estado="Reagendado";

    // enviar informacion a firebase
    const infoTurno = { id,nombre, telefono,nutri,fecha,turno,estado };
    actualizaragendamieto(infoTurno);
    // cerrar modal
    setTurnoEditar(null);

//ver la manera que actualice el valor en pantalla
   // actualizarEstadoTurnos();
    setIsModalEditar(false);
  }

  const [TurnoEstado, setTurnoEstado] = React.useState({
    ...turnoEditar,
  });

  return (
    <Modal
      show={isModalEditar}
      onHide={() => {
        setIsModalEditar(false);
        setTurnoEditar(null);
      }}
    >
      <Modal.Header>
        <Modal.Title>Editar Turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack>
            <Form.Control
              id="nombre"
              placeholder="Por ej: Sonia"
              type="text"
              className="mb-1"
              value={TurnoEstado?.nombre}
              onChange={(e) =>
                setTurnoEstado({
                  ...TurnoEstado,
                  nombre: e.target.value,
                })
              }
            />
            <Form.Control
              id="telefono"
              placeholder="Por ej: 234234534524"
              type="text"
              className="mb-1"
              value={TurnoEstado?.telefono}
              onChange={(e) =>
                setTurnoEstado({
                  ...TurnoEstado,
                  telefono: e.target.value,
                })
              }
            />
           <label>
          Nutricionista:
          <select id="nutri" className="mb-1">
            <option value="nutri 1">Nutri 1</option>
            <option value="nutri 2">Nutri 2</option>
            <option value="nutri 3">Nutri 3</option>
          </select>
        </label>

        <Form.Group controlId="duedate">
        <Form.Control id="fecha" type="date" name="duedate" placeholder="Fecha" />
        </Form.Group>
        <Form.Label>Horario</Form.Label>
                            <Form.Select id="turno" aria-label="Default select example">
		                     <option>--- elige turno ---</option>
                                <option value="08:00"> 08:00</option>
                                <option value="08:30"> 08:30</option>
                                <option value="09:00"> 09:00</option>
                            
                            </Form.Select>
        
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setIsModalEditar(false);
            setTurnoEditar(null);
          }}
        >
          Cancelar
        </Button>
        <Button variant="primary" onClick={editarProductoModal}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditarTurnos;
