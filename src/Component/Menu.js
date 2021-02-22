import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Menu.css'
import logo from '../Image/logo.png'

const menuList = [
    {title: "หน้าแรก", to: "/"},
    {title: "ฟังเสียง", to: "/sound"},
    {title: "ชมภาพ", to: "/video"},
    {title: "เกี่ยวกับ", to: "/about"},
]

const Menu = () => {
    const sidebarRef = React.createRef();
    const [isSidebaropen, setSidebaropen] = React.useState(false);

    return (
        <div id="navbar-container">
            <div id="navbar">
                <div style={{marginLeft: 15, padding: 20}}>
                </div>
                <div className="button-container">
                    <Link to="/" 
                    className="navbar-brand link-button"
                    onClick={()=>setSidebaropen(false)}>
                        <img src={logo} alt="ปฏิบัติธรรม"/>
                    </Link>
                    <div className="d-none d-md-flex">
                        { menuList.map((item, key)=>
                            <LinkButton key={key} to={item.to} title={item.title}/>
                        )}
                    </div>
                </div>
                <div style={{marginRight: 10}}>
                    <div className="link-button d-flex d-md-none"
                    onClick={()=>setSidebaropen(!isSidebaropen ? true:false)}
                    style={{width: 60}}>
                        <div className="link-text">
                            <i className={!isSidebaropen ? "fas fa-bars": "fas fa-times"}></i>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="d-flex d-md-none">
                <Sidebar 
                onRef={sidebarRef}
                isOpen={isSidebaropen}
                menuItem={menuList}
                clickListCallback={()=>{
                    setSidebaropen(false)
                }}
                />
            </div>
            
        </div>
    )
}

const LinkButton = (props) =>{
    return(
        <NavLink to={props.to} 
        className="link-button" 
        exact={props.to === "/" ? true:false}
        activeClassName="link-button-active">
            <div className="link-text">
                {props.title}
            </div>
        </NavLink>
    )
}

const Sidebar = (props) =>{
    const sidebarWidth = 250
    const SidebarList = (props) =>{
        return(
            <Link to={props.to} className="sidebar-list-link" onClick={props.onClick}>
                {props.title}
            </Link>
        )
    }

    return(
        <div id="sidebar" 
        style={{ width: props.isOpen ? sidebarWidth : 0}}
        ref={props.onRef}>
            <div style={{width: sidebarWidth}}>
                { props.menuItem.map((item, key)=>
                    <SidebarList 
                    key={key} 
                    title={item.title} 
                    to={item.to}
                    onClick={()=>props.clickListCallback()}/>
                )}
                <hr/>
                <div className="footer-menu">
                สงวนลิขสิทธิ์ 2564<br/>
                ปฏิบัติธรรมตามพระไตรปิฏก
                </div>
            </div>
        </div>
    )
}

export default Menu