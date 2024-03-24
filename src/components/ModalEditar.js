import React from "react";

import { Modal, Stack, Form, Button } from "react-bootstrap";

import editarProducto from "../functions/editarProducto";
import { getAuth, getUserByEmail } from "firebase/auth";
import firebaseApp from "../firebase/credenciales";
import obtenerUid from "../functions/obteneruid";
import { getFirestore, collection, doc, setDoc, getDoc, query, where, limit } from "firebase/firestore";
import getAllRol from "../functions/getAllRol";
import swal from "sweetalert";

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
    console.log("pasa por aqui antes de entrar en alerta");
    
  }

  const [productoEstado, setProductoEstado] = React.useState({
    ...productoEditar,
  });

  const mostrarAlertaEditar=()=>{
    swal({
      title: "Usuario Editado",
      text: "Fue editado el usuario",
      icon:"success",
      button:"Aceptar",
      timer:"2000"
    })
    //console.log("entro dentro de la alerta");

  }


  const rol=getAllRol();
  //setNutri(nutri);

  //var data=''

  const [data, setData] = React.useState([]);

  var infodata=''

  Promise.resolve(rol).then(value=>{
      //console.log('value: yeda :',value)
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
          <Form.Label>Correo</Form.Label>
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
            <Form.Label>Nombre</Form.Label>
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
           <Form.Label>Rol</Form.Label>
           <Form.Control
              id="rol"
              as="select"
              type="text"
              className="mb-1"
              value={productoEstado?.rol}
              onChange={(e) =>
                setProductoEstado({
                  ...productoEstado,
                  rol: e.target.value,
                })
              }
            > {options}</Form.Control>
        </label>
       { <Form.Control
              id="sku"
              placeholder="sku"
              type="hidden"
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
            />}
        
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
        <Button variant="primary" onClick={() => {editarProductoModal(true);
        mostrarAlertaEditar(true);}}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditar;
