import React from "react";
import "./App.css";
import * as Api from "../../utils/Api";

function App() {
  function handleGet() {
    Api.getTest()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePost() {
    Api.postTest("Тестовая строка")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <button className="button" onClick={handleGet}>
        Get
      </button>
      <button className="button" onClick={handlePost}>
        Post
      </button>
    </div>
  );
}

export default App;
