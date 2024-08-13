"use client";
import React, { useState, useEffect } from "react";

const ScrollTop: React.FC = () => {
  const [bottomPosition, setBottomPosition] = useState<number>(800); // Posição inicial
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsActive(true);
      setBottomPosition(18); // Define a posição de bottom quando ativo
    } else {
      setIsActive(false);
      setBottomPosition(800); // Retorna à posição inicial quando não ativo
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      style={{
        ...scrollTopStyles,
        bottom: `${bottomPosition}px`,
        ...(isActive ? scrollTopActiveStyles : {}),
      }}
    >
      ↑
    </div>
  );
};

const scrollTopStyles: { [key: string]: string } = {
  outline: "none",
  border: "0",
  background: "#8161ffb9",
  width: "50px",
  height: "50px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  right: "18px",
  zIndex: "1000",
  boxShadow:
    "0 1px 6px 2px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.7)",
  cursor: "pointer",
  opacity: "0",
  visibility: "hidden",
  transition: "all 1.2s ease-in-out",
};

const scrollTopActiveStyles: { [key: string]: string } = {
  opacity: "1",
  visibility: "visible",
  color: "white",
  fontSize: "1.5rem",
};

export default ScrollTop;
