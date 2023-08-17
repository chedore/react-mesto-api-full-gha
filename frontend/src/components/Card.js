import React, {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardDelete, onCardLike}) {
  const handleClick = () => onCardClick(card);
  const handleDeleteClick = () => onCardDelete(card);
  const handleLikeClick = () => onCardLike(card);

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;  // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = card.likes.some(i => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const cardLikeButtonClassName = ( `button button_place_element element__info-button ${isLiked && 'element__info-button-active'}`); // Создаём переменную, которую после зададим в `className` для кнопки лайка

  return (
    <article className="element">
      {isOwn && (<button className="button button_place_element element__basket" onClick={handleDeleteClick}></button>)}
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__info-title">{card.name}</h2>
        <div className="element__group-like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="element__span">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
