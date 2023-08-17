import {apiConfig} from "./constants.js"

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  /**Проверить данные от сервера*/
  _checkResponse(res){
    if (res.ok) 
      {return res.json();}
    else 
      {return Promise.reject(`Запрос отклонён, ошибка ${res.status}, нам жаль :(`)}
  }

  /**Универсальный метод запроса с проверкой ответа*/
  async _request(endpoint, options) {
    const url = `${this._baseUrl}${endpoint}`
    return await fetch(url, options)
      .then(this._checkResponse)
  }

  /**Получение информации о пользователе с сервера*/
  getInitialUser(){
    return this._request(
      '/users/me',
      {method: 'GET', headers: this._headers}
    );
  }

  /**Получение карточек с сервера*/
  getInitialCards() {
    return this._request(
      '/cards',
      {method: 'GET', headers: this._headers}
    );
  }

  /**Редактирование профиля*/
  setInfolUser(data) {
    return this._request(
      '/users/me',
      {method: 'PATCH', headers: this._headers, body: JSON.stringify({ name: data.name, about: data.about})}
    );
  }


  /**Добавление новой карточки*/ 
  addNewCard(data) {
    return this._request(
      '/cards',
      {method: 'POST', headers: this._headers, body: JSON.stringify({ name: data.title, link: data.url })}
    );
  }

  /**Удаление карточки на сервере*/ 
  deleteCard(cardId) {
    return this._request(
      `/cards/${cardId}`,
      {method: 'DELETE', headers: this._headers}
    );
  }

  /**Поставить лайк и отправить на сервер*/
  setLikeUp(cardId) {
    return this._request(
      `/cards/${cardId}/likes`,
      {method: 'PUT', headers: this._headers}
    );
  }

  /**Удалить лайк и отправить на сервер*/
  setLikeDown(cardId) {
    return this._request(
      `/cards/${cardId}/likes`,
      {method: 'DELETE', headers: this._headers}
    );
  }
  
  /**Изменить аватарку профиля*/
  setUserAvatar(url) {
    return this._request(
      '/users/me/avatar',
      {method: 'PATCH', headers: this._headers, body: JSON.stringify({avatar: url})}
    );
  }

}

export const api = new Api(apiConfig);