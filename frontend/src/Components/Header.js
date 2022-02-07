import React from 'react';
import { Nav, Navbar,} from "react-bootstrap";

function Header() {
    return (
        <>
            <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' style={{width: '100%'}}>
                <Navbar.Brand style={{marginLeft: '25px', color: "#705858"}}>TestTask</Navbar.Brand>
                <Nav.Link href='/users/' style={{marginLeft:'50px'}}>Users</Nav.Link>
                <Nav.Link href='/groups/'>Groups</Nav.Link>
            </Navbar>
        </>
    );
}

export default Header;