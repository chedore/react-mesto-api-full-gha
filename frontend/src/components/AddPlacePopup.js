import React, {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import { usePopupClose } from "../hooks/usePopupClose";

export default function AddPlacePopup ({isOpen, onClose, onUpdatePlace}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  usePopupClose(isOpen, onClose);

  useEffect(() => {
    setName('')
    setLink('')
  },[isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdatePlace({
      title: name,
      url: link
    });
  }

  return (
    <PopupWithForm 
      name="add_element"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText = 'Содать'
    >
    <input type="text" id="title-input" className="popup__input popup__input_type_name" placeholder="Название" name="title" required minLength="2" maxLength="30" onChange={e => setName(e.target.value)} value={name ?? ''}/>
    <span className="title-input-error popup__error"></span>
    <input type="url" id="email-input" className="popup__input popup__input_type_url" placeholder="Ссылка на картинку" name="url" required onChange={e => setLink(e.target.value)} value={link ?? ''}/>
    <span className="email-input-error popup__error"></span>
  </PopupWithForm>
  )
}