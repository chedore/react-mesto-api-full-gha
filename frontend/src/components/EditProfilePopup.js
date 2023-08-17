import React, { useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { usePopupClose } from "../hooks/usePopupClose";

export default function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = useContext(CurrentUserContext);
  usePopupClose(isOpen, onClose);

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  },[currentUser, isOpen])


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm  
    name="place_profile"
    title="Редактировать профиль"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    buttonText = 'Сохранить'
  >
    <input type="text" id="name-input" className="popup__input popup__input_type_name" placeholder="Укажите имя" name="name" required minLength="2" maxLength="40" onChange={e => setName(e.target.value)} value={name ?? ''}/>
    <span className="name-input-error popup__error"></span>
    <input type="text" id="job-input" className="popup__input popup__input_type_job" placeholder="Укажите профессию" name="job" required minLength="2" maxLength="200" onChange={e => setDescription(e.target.value)} value={description ?? ''}/>
    <span className="job-input-error popup__error"></span>
  </PopupWithForm>
  )
}