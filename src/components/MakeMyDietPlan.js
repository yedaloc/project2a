import React, { useState } from 'react';
import { FoodTable } from './FoodTable.js';
import DatePicker from "react-datepicker";
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import firebaseApp from './credenciales.js';
import { getFirestore, collection,query,addDoc, where, getDocs } from "firebase/firestore";


export function MakeMyDietPlan(props) {

    
    const [cliente, setCliente] = useState('');
    const [telefono, setTelefono] = useState('');
    const [promo, setPromo] = React.useState('');
    const [infopromo, setinfoPromo] = React.useState('');
    const [val, setVal] = React.useState([]);
    const [servicio, setServicio] = useState('');
    const [fecha, setFecha] = useState('');
    const [alerta, setAlerta] = useState(false);
    const [turno, setTurno] = useState('10:00');
    const [error, setError] = useState(false);
    const [nutri, setNutri] = React.useState([]);



    const makedieta = async (e) => {
        e.preventDefault();
        if (cliente == '' || telefono == '' || promo == '' || fecha == '' || turno == '') {
            setError(true);
        } else {
            try {

               // const data = await addDoc(collection(store, 'dieta'), {  nombre: cliente,
                //    tel: telefono,
                //    promocion: promo,
                //    servicio: servicio,
                //    fecha: fecha,
                //    turno: turno,
                //    estado:"Agendado", });
               // console.log('Agregado', data.id);
                setAlerta(true);

            } catch (error) {
                console.log(error);
            }

            setCliente('');
            setTelefono('');
            setPromo('');
            setServicio('');
            setFecha('');
            setTurno('');
            setTimeout(() => {
                setAlerta(false);
            }, 3000);
        }

    };

    // state variable to track search query, set search query to empty string
    const [queryValue, setQueryValue] = useState("");
    // state variable to track food category, set food category to empty string
    const [selectedFoodCategory, setSelectedFoodCategory] = useState("");

    // callback function to handle queryValue change
    const getSearchInputValue = function (event) {
        const enteredQueryValue = event.target.value;
        setQueryValue(enteredQueryValue);
    }

    // callback function to handle changes to the <select> element
    const handleSelectFoodCategoryChange = function (event) {
        const selectedValue = event.target.value;
        setSelectedFoodCategory(selectedValue);
    }

    // for displaying filtered common food data
    const displayedData = props.foodData.filter((row) => {
        let result = false;
        if (queryValue === '') {
            if (row.Category === selectedFoodCategory) {
                result = true;
            } else if (selectedFoodCategory === "") {
                result = true;
            }
        } else if (selectedFoodCategory !== "") {
            if (row.Food.toLowerCase().includes(queryValue.toLowerCase()) && row.Category === selectedFoodCategory) {
                result = true;
            }
        } else if (selectedFoodCategory === "") {
            if (row.Food.toLowerCase().includes(queryValue.toLowerCase())) {
                result = true;
            }
        }
        return result;
    });

    // get food category names for options
    const uniqueCategories = [...new Set(props.foodData.map(food => food.Category))]

    const optionElems = uniqueCategories.map((category) => {
        return <option key={category} value={category}>{category}</option>
    })

    // date picker useState
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <section id="make-my-diet-plan" className="subsection-2">
                <h1>Planificar Dieta</h1>
                <div className="center">
                    <div className="flex-container-make">

                        {/* Set date and filter */}

                        <Form onSubmit={makedieta}>

                        <Form.Group className="make-my-diet-plan-li">
                        <Form.Label>Elija paciente</Form.Label>
                        <Form.Control value={cliente} type="text" placeholder="Por Ej: Lucas" onChange={(e) => { setCliente(e.target.value) }} />
                    </Form.Group>

                    <Form.Group className="make-my-diet-plan-li" controlId="exampleForm.ControlInput1">
                        <Form.Label>Elija cita </Form.Label>
                        <Form.Control value={cliente} type="text" placeholder="Por Ej: Lucas" onChange={(e) => { setCliente(e.target.value) }} />
                    </Form.Group>

                    <h3> Dieta : </h3>
                    <Form.Group className="make-my-diet-plan-li" controlId="exampleForm.ControlInput1">
                   
                        <Form.Label>Desayuno</Form.Label>
                        <Form.Control value={cliente} type="text" placeholder="Por Ej: Lucas" onChange={(e) => { setCliente(e.target.value) }} />
                        <Form.Label>Media manhana</Form.Label>
                        <Form.Control value={cliente} type="text" placeholder="Por Ej: Lucas" onChange={(e) => { setCliente(e.target.value) }} />
                        <Form.Label>Almuerzo</Form.Label>
                        <Form.Control value={cliente} type="text" placeholder="Por Ej: Lucas" onChange={(e) => { setCliente(e.target.value) }} />
                        <Form.Label>Media tarde</Form.Label>
                        <Form.Control value={cliente} type="text" placeholder="Por Ej: Lucas" onChange={(e) => { setCliente(e.target.value) }} />
                        <Form.Label>Merienda</Form.Label>
                        <Form.Control value={cliente} type="text" placeholder="Por Ej: Lucas" onChange={(e) => { setCliente(e.target.value) }} />
                        <Form.Label>Cena</Form.Label>
                        <Form.Control value={cliente} type="text" placeholder="Por Ej: Lucas" onChange={(e) => { setCliente(e.target.value) }} />
                    </Form.Group>


                    
                    
                    

                    <div>
                        {
                            error ?
                                <div><Alert variant="danger">
                                    <span>ERROR! Faltan completar campos</span>
                                </Alert></div>
                                :
                                <span></span>

                        }
                    </div>
                    <Button type="submit" >Guardar Dieta</Button>

                </Form>
                        
                        
                    </div>
                </div>
            </section>
            <footer>
                <p>Common food data collected from <a href="https://www.kaggle.com/datasets/niharika41298/nutrition-details-for-most-common-foods">here</a>.</p>
                <p>&copy; Health Planning 2022</p>
            </footer>
        </div>
    )
}
