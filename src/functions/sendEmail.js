import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "../firebase/credenciales";


function sendEmail(infoUsuario) {
  const auth = getAuth(firebaseApp);
   console.log(infoUsuario)
   const email = infoUsuario.correo
  return sendPasswordResetEmail(auth,email)
    .then(() => {
      // Correo electrónico de restablecimiento de contraseña enviado con éxito
      console.log('Correo electrónico de restablecimiento de contraseña enviado con éxito.');
    })
    .catch((error) => {
      // Manejar errores en el envío del correo electrónico
      console.error('Error al enviar el correo electrónico de restablecimiento de contraseña:', error);
    });
}
export default sendEmail;