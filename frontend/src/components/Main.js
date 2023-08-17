import React, { useContext } from "react";
import avatar from "../images/avatar.jpg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards
}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img
            className="profile__img"
            src={currentUser.avatar? currentUser.avatar:avatar}
            alt="Фото профиля"
            // style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-description">
            <h1 className="profile__info-title">{currentUser.name}</h1>
            <p className="profile__info-subtitle">{currentUser.about}</p>
          </div>
          <button
            className="button button_place_profile-info profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="button button_place_profile profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card card={card} onCardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike} key={card._id} />
        ))}
      </section>
    </main>
  );
}
