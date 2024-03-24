import { Modal, Stack, Form, Button } from "react-bootstrap";
//import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import añadirRol from "../functions/anadirRol";
import swal from "sweetalert";

function ModalAñadirRol({
  isModalAñadirRol,
  setIsModalAñadirRol
}) {


  function añadirRolModal() {
    //obtener infor del formulario
    const nombre= document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const sku = document.getElementById("sku").value;

   
    // enviar informacion a firebase
    const infoRol = {  descripcion,nombre,sku };
    añadirRol(infoRol);
    // cerrar modal
    setIsModalAñadirRol(false);

    


  }

  const mostrarAlertaAnadirRol=()=>{
    swal({
      title: "Rol agregado",
      text: "Fue agregado el rol exitosamente",
      icon:"success",
      button:"Aceptar",
      timer:"2000"
    })
    //console.log("entro dentro de la alerta");

  }

  return (
    <Modal show={isModalAñadirRol} onHide={() => setIsModalAñadirRol(false)}>
      <Modal.Header>
        <Modal.Title>Añadir Rol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack>
          <Form.Label>Nombre de Rol</Form.Label>
            <Form.Control
              id="nombre"
              placeholder="ingresa el nombre del Rol"
              type="text"
              className="mb-1"
            />
            <Form.Label>Descripcion de Rol</Form.Label>
            <Form.Control
              id="descripcion"
              placeholder="descripcion del rol"
              type="text"
              className="mb-1"
            />
           { <Form.Control
              id="sku"
              placeholder="abreviatura del rol"
              type="hidden"
              className="mb-1"
  />}
        
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalAñadirRol(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={()=>{ añadirRolModal(true);
          mostrarAlertaAnadirRol(true);}}>
          Añadir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAñadirRol;
