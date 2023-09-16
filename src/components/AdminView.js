import React from "react";
import signOut from "../functions/cerrarSesion";
import { Container, Stack, Button, Form, Table } from "react-bootstrap";
import getAllProducts from "../functions/getAllProducts";
import getAllRoles from "../functions/getAllRoles";
import eliminarProductoHome from "../functions/eliminarProductoHome";
import filtrarDatos from "../functions/filtrarDatos";

//modales
import ModalAñadir from "../components/ModalAñadir";
import ModalEditar from "../components/ModalEditar";

import ModalAñadirRol from "../components/ModalAnadirRol";


function AdminView({usuario}) {
  const [usuarios, setUsuarios] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [isModalAñadir, setIsModalAñadir] = React.useState(false);
  const [isModalEditar, setIsModalEditar] = React.useState(false);
  const [productoEditar, setProductoEditar] = React.useState(null);
  const [roleAnadir, setRoleAnadir] = React.useState(null);

  const [isModalAnadirRol, setIsModalAnadirRol] = React.useState(false);

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


  function actualizarEstadoRol() {
    getAllRoles().then((rol) => {
      setUsuarios(rol);
    });
  }
  function añadirProductoHome() {
    setIsModalAñadir(true);
  }

  function anadirRolHome() {
    setIsModalAnadirRol(true);
  }

  React.useEffect(() => {
    actualizarEstadoUsuarios();
  }, []);

  return (
    <Container fluid>
      <ModalAñadir
        isModalAñadir={isModalAñadir}
        setIsModalAñadir={setIsModalAñadir}
        actualizarEstadoUsuarios={actualizarEstadoUsuarios}
        usuario={usuario}
      />
      <ModalAñadirRol
        isModalAñadir={isModalAnadirRol}
        setIsModalAñadir={setIsModalAnadirRol}
        actualizarEstadoRol={actualizarEstadoRol}
        roles={roles}
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
            <th>id</th>
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
                <td>{usuario.sku}</td>
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
                      eliminarProductoHome(usuario).then(
                        (confirmacion) => {
                          actualizarEstadoUsuarios();
                        }
                      );
                    }}
                  >
                    Inactivar
                  </Button>
                  <Button
                    variant="info"
                  >
                    Reset password
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button onClick={añadirProductoHome}> Añadir USUARIO</Button>
      <Button onClick={anadirRolHome}> Añadir Rol</Button>
    </Container>
  );
}

export default AdminView;