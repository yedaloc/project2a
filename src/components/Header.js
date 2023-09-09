import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../firebase/credenciales";


const auth = getAuth(firebaseApp);
export function Header({usuario}) {
    return (
        <header>
            <h1 className="pageHeader">HealthPlanning</h1>
            <div className="intro flex-container-intro">
                <div className="flex-item-card-intro">
                    <div className="greetings">
                        <h1>Hola,{usuario.email} </h1>
                        <h2>Qué te gustaría hacer?</h2>
                       

                    </div>
                </div>
            </div>
        </header>
    )
}