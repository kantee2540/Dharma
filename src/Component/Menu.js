import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import './Menu.css'
import logo from '../Image/logo.png'

export default function menu() {
    return (
        <div>
            <Navbar collapseOnSelect expand="md" bg="light" fixed="top">
                <Link to="/" className="navbar-brand"><img src={logo}/></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse style={{justifyContent: "center"}}>
                    <Nav>
                    <NavLink to="/" activeClassName="active" exact className="nav-link">หน้าแรก</NavLink>
                    {/* <NavLink to="/schedule" activeClassName="active" className="nav-link">ตารางกำหนดการ</NavLink> */}
                    <NavLink to="/sound" activeClassName="active" className="nav-link">ฟังเสียง</NavLink>
                    <NavLink to="/video" activeClassName="active" className="nav-link">ชมภาพ</NavLink>
                    <NavLink to="/about" activeClassName="active" className="nav-link">เกี่ยวกับเรา</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
