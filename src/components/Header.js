import React from 'react';

export function Header() {
    return (
        <header>
            <h1 className="pageHeader">HealthPlanning</h1>
            <div className="intro flex-container-intro">
                <div className="flex-item-card-intro">
                    <div className="greetings">
                        <h1>Hola, Azu!</h1>
                        <h2>Qué te gustaría hacer?</h2>
                    </div>
                </div>
            </div>
        </header>
    )
}