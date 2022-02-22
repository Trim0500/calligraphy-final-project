// make a footer

import React from "react";
import {Navbar} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./../Locales/i18n";

export default function Footer () {
    const { t } = useTranslation();

    const footerStyle = {
        backgroundColor: "rgba(242, 175, 109, 0.9)",
        color: "dark",
    }

    return(
        <Navbar style={footerStyle} fixed="bottom" className="justify-content-around">
            <div className="">
                &#169; 2022 {t("copyright")} : Serene Flourish
            </div>
        </Navbar>
    )
}