import React from 'react';
import ReactDOM from "react-dom";
import Siri from "./components/js/Siri2.js"
import "./components/css/App.css"
import "@babel/polyfill";

function App() {
  return (
    <React.Fragment>
      <Siri/>
    </React.Fragment>
  );
}

console.log("react")
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
