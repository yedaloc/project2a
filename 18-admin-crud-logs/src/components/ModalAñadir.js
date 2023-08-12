import { Modal, Stack, Form, Button } from "react-bootstrap";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import añadirUsuario from "../functions/añadirProducto";


function ModalAñadir({
  isModalAñadir,
  setIsModalAñadir,
  actualizarEstadoUsuarios,
  usuario,
}) {
  function añadirProductoModal() {
    //obtener infor del formulario
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const rol = document.getElementById("rol").value;
    const id = document.getElementById("id").value;
    // enviar informacion a firebase
    const infoUsuario = { nombre,correo, password, rol, id };
    añadirUsuario(infoUsuario, usuario.id);
    // cerrar modal
    actualizarEstadoUsuarios();
    setIsModalAñadir(false);
  }

  return (
    <Modal show={isModalAñadir} onHide={() => setIsModalAñadir(false)}>
      <Modal.Header>
        <Modal.Title>Añadir producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack>
          <Form.Control
              id="nombre"
              placeholder="nombre"
              type="text"
              className="mb-1"
            />
            <Form.Control
              id="correo"
              placeholder="correo"
              type="text"
              className="mb-1"
              keyboardType="email-address"
            />

            <label><strong>Email</strong></label>
                    <input type="email" name="email" value={this.state.email} onChange={this.onChange} className="form-control" />
                    <span className="text-danger">{this.state.error}</span>
            <Form.Control
              id="password"
              placeholder="password"
              type="text"
              className="mb-1"
            />
           <label>
              Rol:
              <select id="rol">
                <option value="admin">Administrador</option>
                <option value="usuario">Usuario</option>
                <option value="nutri">Nutricionista</option>
              </select>
            </label>
            <Form.Control
              id="id"
              placeholder="id"
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
        <Button variant="primary" onClick={añadirProductoModal }>
          Añadir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAñadir;
