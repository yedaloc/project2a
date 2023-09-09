import React from "react";

import { Modal, Stack, Form, Button } from "react-bootstrap";

import editarProducto from "../functions/editarProducto";
import { getAuth, getUserByEmail } from "firebase/auth";
import firebaseApp from "../firebase/credenciales";
import obtenerUid from "../functions/obteneruid";
import { getFirestore, collection, doc, setDoc, getDoc, query, where, limit } from "firebase/firestore";

const auth = getAuth(firebaseApp);
function ModalEditar({
  isModalEditar,
  setIsModalEditar,
  actualizarEstadoUsuarios,
  productoEditar,
  setProductoEditar,
  usuario,
}) {
  function editarProductoModal() {
    //obtener infor del formulario
    const correo = document.getElementById("correo").value;
    const nombre = document.getElementById("nombre").value;
    const rol = document.getElementById("rol").value;
    const sku = document.getElementById("sku").value;
    

    // enviar informacion a firebase
    const infoProducto = { correo, nombre, rol,sku };
    editarProducto(infoProducto);
    // cerrar modal
    setProductoEditar(null);
    actualizarEstadoUsuarios();
    setIsModalEditar(false);
  }

  const [productoEstado, setProductoEstado] = React.useState({
    ...productoEditar,
  });

  return (
    <Modal
      show={isModalEditar}
      onHide={() => {
        setIsModalEditar(false);
        setProductoEditar(null);
      }}
    >
      <Modal.Header>
        <Modal.Title>Editar usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack>
            <Form.Control
              id="correo"
              placeholder="correo"
              type="text"
              className="mb-1"
              value={productoEstado?.correo}
              onChange={(e) =>
                setProductoEstado({
                  ...productoEstado,
                  correo: e.target.value,
                })
              }
            />
            <Form.Control
              id="nombre"
              placeholder="nombre"
              type="text"
              className="mb-1"
              value={productoEstado?.nombre}
              onChange={(e) =>
                setProductoEstado({
                  ...productoEstado,
                  nombre: e.target.value,
                })
              }
            />
           <label>
          Rol:
          <select id="rol" className="mb-1">
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
            <option value="nutri">Nutricionista</option>
          </select>
        </label>
        <Form.Control
              id="sku"
              placeholder="sku"
              type="text"
              className="mb-1"
              value={productoEstado?.sku}
              onChange={(e) =>
                setProductoEstado({
                  ...productoEstado,
                  nombre: e.target.value,
                })
              }
              disabled
              readOnly
            />
        
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setIsModalEditar(false);
            setProductoEditar(null);
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

export default ModalEditar;
