import React from "react";
import signOut from "../functions/cerrarSesion";
import { Container, Stack, Button, Form, Table } from "react-bootstrap";
import getAllProducts from "../functions/getAllProducts";
import eliminarProductoHome from "../functions/eliminarProductoHome";
import filtrarDatos from "../functions/filtrarDatos";

//modales
import ModalAñadir from "../components/ModalAñadir";
import ModalEditar from "../components/ModalEditar";

function Home({ usuario }) {
  const [usuarios, setUsuarios] = React.useState([]);
  const [isModalAñadir, setIsModalAñadir] = React.useState(false);
  const [isModalEditar, setIsModalEditar] = React.useState(false);
  const [productoEditar, setProductoEditar] = React.useState(null);

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
            <th>password</th>
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
                <td>{usuario.id}</td>
                <td>{usuario.password}</td>
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
                      eliminarProductoHome(usuario.id).then(
                        (confirmacion) => {
                          actualizarEstadoUsuarios();
                        }
                      );
                    }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button onClick={añadirProductoHome}> Añadir USUARIO</Button>
    </Container>
  );
}

export default Home;
