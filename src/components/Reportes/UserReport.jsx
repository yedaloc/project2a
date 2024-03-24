import React from "react";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap"; // O utiliza tu propio sistema de UI

function PDFGenerator() {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
   
    doc.save("Reporte Perfil Usuario.pdf");
  };

  

  return (
    <div>
      <h1>Generador de PDF</h1>
      <Button onClick={generatePDF}>Reporte Usuario</Button>
    </div>
  )
}

export default PDFGenerator;