import { Modal, Stack, Form, Button } from "react-bootstrap";
//import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import añadirProducto from "../functions/añadirUsuario";
import añadirUsuario from "../functions/añadirUsuario";

function ModalAñadir({
  isModalAñadir,
  setIsModalAñadir,
  actualizarEstadoUsuarios,
  usuario,
}) {
  function añadirProductoModal() {
    //obtener infor del formulario
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const rol = document.getElementById("rol").value;
    const nombre = document.getElementById("nombre").value;
    const estado = "inactivo"
   // const sku = document.getElementById("sku").value;
    // enviar informacion a firebase
    const infoUsuario = { correo, rol,nombre,contrasena,estado };
    añadirUsuario(infoUsuario);
    // cerrar modal
    actualizarEstadoUsuarios();
    setIsModalAñadir(false);
  }

  return (
    <Modal show={isModalAñadir} onHide={() => setIsModalAñadir(false)}>
      <Modal.Header>
        <Modal.Title>Añadir Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack>
            <Form.Control
              id="correo"
              placeholder="ingresa el correo"
              type="email"
              className="mb-1"
            />
            <Form.Control
              id="contrasena"
              placeholder="ingrese la contrasena"
              type="password"
              className="mb-1"
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
              id="nombre"
              placeholder="nombre"
              type="text"
              className="mb-1"
            />
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalAñadir(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={añadirProductoModal}>
          Añadir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAñadir;
