import React from "react";
import { useTranslation } from "react-i18next";
import "./../Locales/i18n";

export default function Footer () {
    const { t } = useTranslation();

    const footerStyle = {
        backgroundColor: "#f5f5f5",
        color: "dark",
        padding: "10px",
        bottom: "0",
        width: "100%",
        textAlign: "center",
        fontSize: "0.8em",
        fontWeight: "bold",
        fontFamily: "Arial, Helvetica, sans-serif",
        textTransform: "uppercase",
        letterSpacing: "2px",
        borderTop: "1px solid #ccc",
        borderBottom: "1px solid #ccc",
        boxShadow: "0px 0px 5px #ccc",
        zIndex: "999",
        position: "fixed",
    };

    return(
        <div style={footerStyle}>
            &#169; 2022 {t("copyright")} : Serene Flourish
        </div>
    )
}