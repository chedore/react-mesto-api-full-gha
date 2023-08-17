import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = formValue;
    onRegister(password, email);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form name="register" className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="register-email-input"
          className="auth__input"
          placeholder="Email"
          name="email"
          required
          onChange={handleChange}
          value={formValue.email}
        />
        <input
          type="password"
          id="register-password-input"
          className="auth__input"
          placeholder="Пароль"
          name="password"
          required
          onChange={handleChange}
          value={formValue.password}
        />
        <button className="button auth__submit-button" type="submit">
          Зарегистрироваться
        </button>
        <Link className="link auth__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}
