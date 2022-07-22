import React from "react";
import "./App.css";
import api from "../../utils/Api";

function App() {
  function handleGet() {
    // api
    //   .getTest()
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  function handlePost() {
    // api
    //   .postTest()
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
