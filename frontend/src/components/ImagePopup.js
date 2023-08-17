import React from "react";

export default function ImagePopup({ name, isOpen, onClose, card }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_image">
        <button
          className="button button_place_popup popup__close"
          type="button"
          aria-label="close"
          onClick={onClose}
        ></button>
        <img alt={card.name} className="popup__img" src={card.link} />
        <h2 className="popup__name">{card.name}</h2>
      </div>
    </div>
  );
}
