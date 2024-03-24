import React from "react";
import signOut from "../functions/cerrarSesion";
import { Container, Stack, Button, Form, Table } from "react-bootstrap";
import getAllProducts from "../functions/getAllProducts";
import inactivarEstadoUsuarios from "../functions/inactivaEstadoUsuario";
import activarEstadoUsuarios from "../functions/activaEstadoUsuario";
import filtrarDatos from "../functions/filtrarDatos";
import { Header } from './Header.js';
import { Footer } from './Footer.js';

//modales
import ModalAñadir from "../components/ModalAñadir";
import ModalEditar from "../components/ModalEditar";
import ModalAñadirRol from "./ModaAnadirRol";
import sendEmail from "../functions/sendEmail";
import swal from "sweetalert";



function AdminView({usuario}) {
  const [usuarios, setUsuarios] = React.useState([]);
  const [isModalAñadir, setIsModalAñadir] = React.useState(false);
  const [isModalEditar, setIsModalEditar] = React.useState(false);
  const [productoEditar, setProductoEditar] = React.useState(null);

  //agregado el 1609
  const [isModalAñadirRol, setIsModalAñadirRol] = React.useState(false);

  async function busquedaFormHandler(e) {
    e.preventDefault();
    const busqueda = e.target.busqueda.value;
    const nvosDocus = await filtrarDatos(busqueda);
    setUsuarios(nvosDocus);
  }

  function actualizarEstadoUsuarios() {
    getAllProducts().then((usuarios) => {
      setUsuarios(usuarios);
    });
  }

  function añadirProductoHome() {
    setIsModalAñadir(true);
  }
//agredado 1609
  function añadirRolHome() {
    setIsModalAñadirRol(true);
  }

  React.useEffect(() => {
    actualizarEstadoUsuarios();
  }, []);
  const mostrarAlertaActivo=()=>{
    swal({
      title: "Usuario activado",
      text: "Fue activado sin inconvenientes",
      icon:"success",
      button:"Aceptar",
      timer:"5000"
    })
    //console.log("entro dentro de la alerta");

  }

  const mostrarAlertaInactivo=()=>{
    swal({
      title: "Usuario desactivado",
      text: "Fue desactivado sin inconvenientes",
      icon:"success",
      button:"Aceptar",
      timer:"5000"
    })
    //console.log("entro dentro de la alerta");

  }

 

  const mostrarAlertaMail=()=>{
    swal({
      title: "Correo enviado",
      text: "Fue enviado el correo de restablecimiento de contrasena",
      icon:"success",
      button:"Aceptar",
      timer:"2000"
    })
    //console.log("entro dentro de la alerta");

  }

  return (
    
    <Container fluid>
      <Header usuario={usuario} />
      <ModalAñadir
        isModalAñadir={isModalAñadir}
        setIsModalAñadir={setIsModalAñadir}
        actualizarEstadoUsuarios={actualizarEstadoUsuarios}
        usuario={usuario}
      />
      
         <ModalAñadirRol
        isModalAñadirRol={isModalAñadirRol}
        setIsModalAñadirRol={setIsModalAñadirRol}
      />
      {productoEditar && (
        <ModalEditar
          isModalEditar={isModalEditar}
          setIsModalEditar={setIsModalEditar}
          actualizarEstadoUsuarios={actualizarEstadoUsuarios}
          productoEditar={productoEditar}
          setProductoEditar={setProductoEditar}
          usuario={usuario}
        />
      )}
      <Stack direction="horizontal" className="justify-content-between">
        <p style={{ fontSize: 24 }}>Bienvenido,{usuario.email} </p>
        <Button onClick={signOut}>Cerrar sesión</Button>
      </Stack>
      <hr />

      <Form onSubmit={busquedaFormHandler}>
        <Stack direction="horizontal">
          <Form.Group controlId="busqueda" className="w-75 m-3">
            <Form.Control type="text" placeholder="Buscar" />
          </Form.Group>
          <Button variant="dark" type="submit">
            Buscar
          </Button>
          <Button
            variant="light"
            onClick={() => {
              const input = document.getElementById("busqueda");
              input.value = "";
              actualizarEstadoUsuarios();
            }}
          >
            Resetear
          </Button>
        </Stack>
      </Form>

      <hr />
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Correo</th>
            <th>Nombre</th>
            <th>rol</th>
         { /*  <th>id</th>  */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios &&
            usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.rol}</td>
                { /*  <td>{usuario.sku}</td> */}
                <td>
                  <Button
                    variant="dark"
                    onClick={() => {
                      setProductoEditar({ ...usuario });
                      setIsModalEditar(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      inactivarEstadoUsuarios(usuario).then(
                        (confirmacion) => {
                          actualizarEstadoUsuarios();
                        }
                      );
                      mostrarAlertaInactivo(true);
                    }}
                  >
                    Inactivar
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => {
                      activarEstadoUsuarios(usuario).then(
                        (confirmacion) => {
                          actualizarEstadoUsuarios();
                          
                        }
                      );
                      mostrarAlertaActivo(true);
                    }}
                  >
                    Activar
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => {
                      sendEmail(usuario).then(
                        (confirmacion) => {
                          actualizarEstadoUsuarios();
                        }
                      );
                      mostrarAlertaMail(true);
                    }}
                  >
                    Reset password
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button onClick={añadirProductoHome}> Añadir USUARIO</Button>
      <Button onClick={añadirRolHome}> Añadir Rol</Button>


      <Footer />
      
    </Container>
  );
}

export default AdminView;