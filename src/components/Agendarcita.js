import React from 'react';
import { useNavigate } from "react-router-dom"
//import './AgendarCita.css'

// loque tengo que analizar aqui es cuandlo logueamos podemos agendar por ende se requiere logueo
//luego tengo que obtener y guardar los datos del usuario que va a agendar ver si es potable por parte del nutri o del user\
//por parte del nutri una query que traiga listado de pacientes para poder seleccionar su paciente 
//por parte del usuario una query que pueda traer el listado de nutricionista (por mas que en nuestro caso sea solo 1)
//Una vez que tengamos el listado para cada uno que probablemente filtraremos por su rol asignado  (tener en cuenta los usuarios que no posean roles)
//Luego hay que fijarse que en una cita se puede cancelar,reagendar, falta de paciente,y se pudo ser realizada
//motivo de cancelacion y , motivos generar pdf comprobante
//definicion de turnos de los nutricionista
//reagendamiento


//1 crear los turnos (quienes pueden crear los turno? el nutricionista puede crear pero por default habran sesiones de 30 min
// poder limitar cantidad de pacientes por dia) 
//2 Ver el menu el formulario email autocompletado , fecha , hora y que turno y elijo mi nutricionista agendar y estado por default agendado 
// y enviar en al mail de ambos nuevo turno realizado lo guardo en la base , puedo descargar mi pdf
//yo como paciente puedo ver el estado de la cita agendada y puedo cancelar mi cita y envie correo que se cancelo su cita y para reagendar 
//yo como nutricionista puedo ver lo agendado conmigo y editar los estados de las citas conmigo

const AgendarCita = () => {

    const navigate = useNavigate();


     const success = () =>{
        navigate('/success')
    
     }
    return (
        <div className="form">
           <h2 className="text-center fw-bold fs-1 py-3">Agenda tu cita ahora</h2>
           <form className="my-5 " onSubmit={success}>
               
               <div className="mb-3">
                    <label className="mx-2 text-white fw-bold" htmlFor="name">Nombre</label>
                    <input className="mx-2 w-25" type="text" name="name" placeholder="Nombre" required />
                    <input className="mx-2 w-25" type="text" name="name" id="name "placeholder="Apellido" required />
                    
               </div>  
               
               <div className="mb-3">
                   <label className="mx-2 text-white fw-bold" htmlFor="email">Email</label>
                   <input required className="w-25" type="email" name="" id="" placeholder="email" />
               </div>
               <div className="mb-3">
                   <label htmlFor="age" className="mx-2 text-white fw-bold">Edad</label>
                   <input type="text" name="" id="" placeholder="edad" />
               </div>
               
               <div className="mb-3">
               <label className="mx-2  text-white fw-bold" htmlFor="gender">Genero</label>
               <input type="radio" id="male" name="gender" value="Male"/>
               <label className="mx-2 text-white fw-bold" for="male ">Masculino</label>
               <input  type="radio" id="female" name="gender" value="Female"/>
               <label  className="fw-bold text-white" for="female">Femenino</label> 
               </div>
               <div className="mb-3">
                   <label className="mx-2 text-white fw-bold" htmlFor="date">Fecha</label>
                   <input required type="date" name="" id="" />
               </div> 
               <div>
                   <label  className="mx-2 text-white fw-bold" htmlFor="time">Horario</label>
                   <input required type="time" name="" id="" /> <br /> <br />
               </div> 
                <input style={{marginLeft:'6%',backgroundColor: 'yellow', border:'1px solid yellow',borderRadius:'5px'}} type="submit" value="Agengar ahora" />
           </form>
        </div>
    );
};

export default AgendarCita;