import React, { useEffect, useContext, useRef} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { usePopupClose } from "../hooks/usePopupClose";

export default function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {
  const currentUser = useContext(CurrentUserContext);
  const inputAvatar = useRef();
  usePopupClose(isOpen, onClose);

  useEffect(() => {
    inputAvatar.current.value=""
  },[currentUser])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputAvatar.current.value
    });
  } 

  return (
    <PopupWithForm 
      name="type_avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText = 'Содать'
    >

    <input type="url" id="email-input1" className="popup__input popup__input_type_url" ref={inputAvatar} placeholder="Ссылка на аватар" name="url" required />
    <span className="email-input1-error popup__error"></span>
    
    </PopupWithForm>
  )
}