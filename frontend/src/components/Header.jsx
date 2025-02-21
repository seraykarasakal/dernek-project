// src/components/Header.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = ({ title, buttons, subTitle }) => {
    const navigate = useNavigate();

    return (
        <>
            {/* Ana Header */}
            <header
                className="shadow-sm"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "70px",
                    zIndex: 1000,
                    backgroundColor: "#343a40",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h1 style={{ margin: 0, fontSize: "24px" }}>{title}</h1>
                <div className="d-flex gap-2">
                    {buttons.map((btn, index) => (
                        <Button
                            key={index}
                            variant={btn.variant}
                            onClick={() => navigate(btn.link)}
                            style={{
                                borderRadius: "20px",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            {btn.label}
                        </Button>
                    ))}
                </div>
            </header>

            {/* SubHeader (Dinamik Başlık) */}
            <div
                style={{
                    backgroundColor: "#f8f9fa",
                    color: "#333",
                    width: "100%",
                    padding: "10px 20px",
                    borderBottom: "1px solid #e0e0e0",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    position: "fixed",
                    top: "70px",
                    zIndex: 999,
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontSize: "20px",
                        fontWeight: "600",
                        textAlign: "left",
                    }}
                >
                    {subTitle}
                </h2>
            </div>

            {/* Altındaki Sayfanın Başlangıç Noktası */}
            <div style={{ paddingTop: "120px" }}></div>
        </>
    );
};

export default Header;
