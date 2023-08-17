import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [сheckLogged, setCheckLogged] = React.useState("error");
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      // Создаём массив с промисами
      const promises = [api.getInitialUser(), api.getInitialCards()];
      // Передаём массив с промисами методу Promise.all
      Promise.all(promises)
        .then(([user, cards]) => {
          setCurrentUser(user.data);
          setCards(cards);
        })
        .catch((error) => alert(error));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    checkTocken();
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }
  function handleEditProfileClick() {
    setEditProfileClick(true);
  }
  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }
  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => alert(error));
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .setLikeUp(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard.data : c))
          );
        })
        .catch((error) => alert(error));
    } else {
      api
        .setLikeDown(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard.data : c))
          );
        })
        .catch((error) => alert(error));
    }
  }
  function handleUpdateUser(data) {
    api
      .setInfolUser(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => alert(error));
  }
  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => alert(error));
  }
  function handleUpdatePlace(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((error) => alert(error));
  }
  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }
  function checkTocken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .authentication(jwt)
        .then((res) => {
          console.log(res.data)
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setCheckLogged("error");
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        navigate("/sign-in");
        setCheckLogged("success");
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        setCheckLogged("error");
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }
  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={email} signOut={signOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                cards={cards}
              />
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdatePlace={handleUpdatePlace}
        ></AddPlacePopup>

        <ImagePopup
          name="type_image"
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <InfoTooltip
          onAccess={сheckLogged}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name="type_delete"
          title="Вы уверены?"
          isOpen={false}
          onClose={closeAllPopups}
          buttonText="Да"
        ></PopupWithForm>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
