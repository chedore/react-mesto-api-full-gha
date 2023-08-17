import React from "react";
import iconOk from "../images/ok.svg";
import iconError from "../images/error.svg";

export default function InfoTooltip({ onAccess, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container-tooltip">
        {onAccess === "success" ? (
          <img src={iconOk} alt="ok" />
        ) : (
          <img src={iconError} alt="error" />
        )}
        <h2 className="popup__title-tooltip">
          {onAccess === "success"
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
        <button
          className="button button_place_tooltip popup__close"
          type="button"
          aria-label="close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
