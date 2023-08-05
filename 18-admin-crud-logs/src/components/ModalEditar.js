import React from "react";

import { Modal, Stack, Form, Button } from "react-bootstrap";

import editarProducto from "../functions/editarProducto";

function ModalEditar({
  isModalEditar,
  setIsModalEditar,
  actualizarEstadoProductos,
  productoEditar,
  setProductoEditar,
  usuario,
}) {
  function editarProductoModal() {
    //obtener infor del formulario
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const nombre = document.getElementById("nombre").value;
    const id = document.getElementById("id").value;
    const rol = document.getElementById("rol").value;
    // enviar informacion a firebase
    const infoProducto = { correo, nombre, id, rol };
    editarProducto(infoProducto, usuario.correo);
    // cerrar modal
    setProductoEditar(null);
    actualizarEstadoProductos();
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
              id="password"
              placeholder="password"
              type="number"
              className="mb-1"
              value={productoEstado?.password}
              onChange={(e) =>
                setProductoEstado({
                  ...productoEstado,
                  password: e.target.value,
                })
              }
            />
            <Form.Control
              id="nombre"
              placeholder="nombre"
              type="number"
              className="mb-1"
              value={productoEstado?.nombre}
              onChange={(e) =>
                setProductoEstado({
                  ...productoEstado,
                  nombre: e.target.value,
                })
              }
            />
            <Form.Control
              id="id"
              placeholder="id"
              type="text"
              className="mb-1"
              value={productoEstado?.id}
              onChange={(e) =>
                setProductoEstado({
                  ...productoEstado,
                  id: e.target.value,
                })
              }
            />
             <Form.Control
              id="rol"
              placeholder="rol"
              type="text"
              className="mb-1"
              value={productoEstado?.rol}
              onChange={(e) =>
                setProductoEstado({
                  ...productoEstado,
                  rol: e.target.value,
                })
              }
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
