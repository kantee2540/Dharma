import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Menu.css";
import logo from "../Image/logo.png";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faHomeAlt,
  faInfoCircle,
  faMusic,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

type menuListType = {
  title: string;
  to: string;
  icon: IconProp;
};

const menuList: menuListType[] = [
  { title: "หน้าแรก", to: "/", icon: faHomeAlt },
  { title: "ฟังเสียง", to: "/sound", icon: faMusic },
  { title: "ชมภาพ", to: "/video", icon: faVideo },
  { title: "เกี่ยวกับ", to: "/about", icon: faInfoCircle },
];

const Menu = () => {
  const [isSidebaropen, setSidebaropen] = React.useState(false);

  return (
    <div id="navbar-container">
      <div id="navbar">
        <div style={{ marginLeft: 15, padding: 20 }}></div>
        <div className="button-container">
          <Link
            to="/"
            className="navbar-brand link-button"
            onClick={() => setSidebaropen(false)}
          >
            <img src={logo} alt="ปฏิบัติธรรม" />
          </Link>
          <div className="d-none d-md-flex">
            {menuList.map((item, key) => (
              <LinkButton
                key={key}
                to={item.to}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
        <div style={{ marginRight: 10 }}>
          <div
            className="link-button d-flex d-md-none"
            onClick={() => setSidebaropen(!isSidebaropen ? true : false)}
            style={{ width: 60 }}
          >
            <div className="link-text">
              <i
                className={!isSidebaropen ? "fas fa-bars" : "fas fa-times"}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex d-md-none">
        <Sidebar
          isOpen={isSidebaropen}
          menuItem={menuList}
          onClickList={() => setSidebaropen(false)}
        />
      </div>
    </div>
  );
};

type LinkButtonProps = {
  to: string;
  title: string;
  icon: IconProp;
};

const LinkButton = ({ to, title, icon }: LinkButtonProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "link-button link-button-active" : "link-button"
      }
    >
      <FontAwesomeIcon icon={icon} />
      <div className="link-text">{title}</div>
    </NavLink>
  );
};

type SidebarProps = {
  isOpen: boolean;
  menuItem: menuListType[];
  onClickList: () => void;
};

type SidebarItemProps = {
  title: string;
  to: string;
  icon: IconProp;
  onClick: () => void;
};

const Sidebar = ({ isOpen, menuItem, onClickList }: SidebarProps) => {
  const sidebarWidth = 250;
  const SidebarList = ({ title, to, icon, onClick }: SidebarItemProps) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "sidebar-list-link sidebar-list-link-active"
            : "sidebar-list-link"
        }
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} />
        <div>{title}</div>
      </NavLink>
    );
  };

  return (
    <div id="sidebar" style={{ width: isOpen ? sidebarWidth : 0 }}>
      <div style={{ width: sidebarWidth }}>
        {menuItem.map((item, key) => (
          <SidebarList
            key={key}
            title={item.title}
            to={item.to}
            icon={item.icon}
            onClick={onClickList}
          />
        ))}
        <hr style={{ margin: 0 }} />
        <Footer />
      </div>
    </div>
  );
};

export default Menu;
