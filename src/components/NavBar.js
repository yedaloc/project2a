import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

export class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="lg">
                    <NavbarBrand exact="true" to="/homepage" activeclassname="active" tag={RRNavLink}>HealthPlanning</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>

                        {/* left section */}
                        <Nav className="ml-auto" navbar>
                            {/* tab for home page */}
                            <NavItem> <NavLink exact="true" to="/homepage" activeclassname="active" tag={RRNavLink}>Página Principal</NavLink> </NavItem>

                            {/* tab for about page */}
                            <NavItem> <NavLink exact="true" to="/about" activeclassname="active" tag={RRNavLink}>Nosotros</NavLink> </NavItem>

                            {/* tab for calendar page*/}
                            <NavItem> <NavLink exact  = "true" to="/Calendar" activeclassname="active" tag={RRNavLink}>Agendar Citas</NavLink> </NavItem>

                            {/* tab for Mis Citas page*/}
                            <NavItem> <NavLink exact  = "true" to="/My Dates" activeclassname="active" tag={RRNavLink}>Mis citas</NavLink> </NavItem>
                        </Nav>

                        {/* middle section */}
                        <Nav className="m-auto" navbar>
                            {/* tab for bmi calculator */}
                            <NavItem> <NavLink exact="true" to="/bmicalculator" activeclassname="active" tag={RRNavLink}>
                                IMC &nbsp;&nbsp;&nbsp;&nbsp;
                            </NavLink>
                            </NavItem>

                            {/* tab for make my plan */}
                            <NavItem>
                                <NavLink exact="true" to="/makeplan" activeclassname="active" tag={RRNavLink}>
                                    Planificar Dieta &nbsp;&nbsp;&nbsp;&nbsp;
                                </NavLink>
                            </NavItem>

                            {/* tab for view my plan */}
                            <NavItem>
                                <NavLink exact="true" to="/viewplan" activeclassname="active" tag={RRNavLink}>
                                    Plan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </NavLink>
                            </NavItem>
                        </Nav>

                        {/* right section */}
                        <Nav className="mr-auto" navbar>
                            {/* User name and icon */}
                            <NavItem>
                                <NavLink className='name' style={{ color: 'rgb(235, 140, 156)' }} href="/">
                                    Azu&nbsp;
                                    <span className="material-icons">face</span>
                                </NavLink> </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}