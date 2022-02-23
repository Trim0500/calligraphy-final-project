import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';
import { NavDropdown } from 'react-bootstrap';
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import "./../../Locales/i18n";

export default function NavbarCustom() {
    const { t } = useTranslation();

    const handleOnclick=(e)=>{
        e.preventDefault();
        i18n.changeLanguage(e.target.value);
      }

    const handleLogout = () => {
        localStorage.removeItem('JwtToken');
        window.location.href = '/admin/login';
    }
    const handleClick = () => {
        if (localStorage.getItem('JwtToken')) {
            return (
                <NavDropdown className="font" title={t("dashboardTitle")}>
                    <NavDropdown.Item href="/admin/dashboard/portfolio">{t("portfolioText")}</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/dashboard/forms">{t("formsHeader")}</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/dashboard/contracts">{t("contractText")}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>{t("logoutText")}</NavDropdown.Item>
                </NavDropdown>
            )
        }
        else {
            return <div></div>
        }
    }

    return (
        <>
            <Nav>
                <NavLink to='/home'>
                    <span className="fw-bold pt-1 h5 text-center align-content-center">{t("title")} </span>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink className="fw-bold" to='/about'>
                        {t("about")}
                    </NavLink>
                    <NavLink className="fw-bold" to='/portfolio'>
                        {t("services")}
                    </NavLink>
                    <NavLink className="fw-bold" to='/form'>
                        {t("forms")}
                    </NavLink>
                    {handleClick()}
                </NavMenu>
                <button className={'btn-primary  m-1 rounded-2'} value='en' onClick={handleOnclick}>
                    English
                </button>
                <button className={'btn-primary  m-1 rounded-2'} value='fr' onClick={handleOnclick}>
                    Français
                </button>
            </Nav>
        </>
    );
};
