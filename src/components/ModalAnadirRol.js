import { Modal, Stack, Form, Button } from "react-bootstrap";
//import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import anadirRol from "../functions/anadirRol";

function ModalAñadirRol({
  isModalAñadirRol,
  setIsModalAñadirRol,
  actualizarEstadoRol,
  rol,
}) {
  function añadirRolModal() {
    //obtener infor del formulario
    const nombreRol= document.getElementById("nombreRol").value;
    const descripcion = document.getElementById("descripcion").value;

   
    // enviar informacion a firebase
    const infoRol = {  descripcion,nombreRol };
    anadirRol(infoRol);
    // cerrar modal
    actualizarEstadoRol();
    setIsModalAñadirRol(false);
  }

  return (
    <Modal show={isModalAñadirRol} onHide={() => setIsModalAñadirRol(false)}>
      <Modal.Header>
        <Modal.Title>Añadir Rol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack>
            <Form.Control
              id="nombreRol"
              placeholder="ingresa el nombre del Rol"
              type="text"
              className="mb-1"
            />
            <Form.Control
              id="descripcion"
              placeholder="descripcion del rol"
              type="text"
              className="mb-1"
            />
        
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalAñadirRol(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={añadirRolModal}>
          Añadir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAñadirRol;
