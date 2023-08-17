import React from "react";
import logo from "../images/logo.svg";
import { useLocation, Link } from "react-router-dom";

export default function Header({ loggedIn, email, signOut }) {
  const location = useLocation();
  const path = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in";
  const linkName = location.pathname === "/sign-in" ? "Регистрация" : "Войти";
  return (
    <header className="header">
      <img className="logo logo_place_header" src={logo} alt="Логотип" />
      {loggedIn ? (
        <div className="header__group">
          <p className="header__email">{email}</p>
          <Link className="link header__link" to="sign-in" onClick={signOut}>
            Выйти
          </Link>
        </div>
      ) : (
        <Link className="link header__link" to={path}>
          {linkName}
        </Link>
      )}
    </header>
  );
}
