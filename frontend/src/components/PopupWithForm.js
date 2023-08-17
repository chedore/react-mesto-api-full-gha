import React from "react";

export default function PopupWithForm ({name, title, isOpen, onClose, children, onSubmit, buttonText}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`} >
        <div className="popup__container">
          <button className="button button_place_popup popup__close" type="button" aria-label="close" onClick={onClose}/>
          <h2 className="popup__container-title">{title}</h2>
          <form className="popup__form" name={`form-${name}`} onSubmit={onSubmit}>
            {children? children:<></>}
            <button type="submit" className="button popup__save-button">{buttonText}</button>
          </form>
        </div>
      </div>
  );
}