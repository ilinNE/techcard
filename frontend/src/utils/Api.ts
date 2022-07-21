class Api {
  // constructor({ address, headers }) {
  //   this._address = address;
  //   this._headers = headers;
  // }
  // _checkResponseStatus(res) {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return Promise.reject(`Ошибка: ${res.status}`);
  // }
  // getTest() {
  //   return fetch(`${this._address}/api/hello`, {
  //     method: "GET",
  //     headers: this._headers,
  //   }).then(this._checkResponseStatus);
  // }
  // postTest() {
  //   return fetch(`${this._address}/api/hello`, {
  //     method: "POST",
  //     headers: this._headers,
  //     body: JSON.stringify({}),
  //   }).then(this._checkResponseStatus);
  // }
}

const api = new Api();
// {
//   address: "http://51.250.109.250",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// }

export default api;
