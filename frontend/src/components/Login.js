import React, { useState } from "react";

export default function Login({ onLogin }) {
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
    onLogin(password, email);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form name="login" className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="login-email-input"
          className="auth__input"
          placeholder="Email"
          name="email"
          required
          onChange={handleChange}
          value={formValue.email || ""}
        />
        <input
          type="password"
          id="login-password-input"
          className="auth__input"
          placeholder="Пароль"
          name="password"
          required
          onChange={handleChange}
          value={formValue.password || ""}
        />
        <button className="button auth__submit-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
