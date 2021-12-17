import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';

interface MenuProps {
  isLogged: boolean;
  onLogout: () => void;
}

const Menu = ({ isLogged, onLogout }: MenuProps) => (
  <Navbar bg="light" variant="light" expand="lg">
    <Navbar.Brand as={Link} to="/">HramBedminton.sk</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        {
          isLogged ? (
            <>
              <NavDropdown title="Zápasy" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/hrac/prehlad">Prehľad</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/hrac/naplanovat-zapas">Naplánovať zápas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/hrac/novy-zapas">Pridať výsledok <Badge pill variant="danger">čoskoro</Badge></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Tréningy" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/trening/naplanovat-trening">Moje tréningy <Badge pill variant="danger">čoskoro</Badge></NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/trening/naplanovat-trening">Naplánovať trening <Badge pill variant="danger">čoskoro</Badge></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Turnaje" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/hrac/naplanovat-turnaj">Moje turnaje <Badge pill variant="danger">čoskoro</Badge></NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/hrac/naplanovat-turnaj">Vytvoriť turnaj <Badge pill variant="danger">čoskoro</Badge></NavDropdown.Item>
              </NavDropdown>
            </>
          ) : null
        }
        <Nav.Link as={Link} to="/treneri">Tréneri</Nav.Link>
      </Nav>
      <Nav>
        {
          isLogged ? (
            <Nav.Link onClick={onLogout} href="#">Odhlásiť sa</Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/prihlasit-sa">Prihlásiť sa</Nav.Link>
          )
        }
        <Nav.Link as={Link} to="/kontakt">Kontakt</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default React.memo(Menu);
