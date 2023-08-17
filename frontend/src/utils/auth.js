export const BASE_URL = "https://auth.nomoreparties.co"

function checkResponse(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

/**Универсальный метод запроса с проверкой ответа*/
export async function request (endpoint, options) {
  const url = `${BASE_URL}${endpoint}`
  return await fetch(url, options)
    .then(checkResponse)
};

export const register = (password, email) => {
  return request (
    '/signup',
    {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify({password, email})}
  );
}

export const authorize = (password, email) => {
  return request (
    '/signin',
    {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify({password, email})}
  );
}

export const authentication = (token) => {
  return request (
    '/users/me',
    {method: 'GET', headers: {"Content-Type": "application/json", "Authorization" : `Bearer ${token}`}}
  );
}
