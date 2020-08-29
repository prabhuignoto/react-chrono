import React from "react";
// import { Crono } from "react-crono";
import { hot } from "react-hot-loader/root";
import "./App.css";
import data from "./data";
import { Crono } from "../react-crono";

function App() {
  return (
    <div className="App">
      <Crono items={data} mode="HORIZONTAL" />
    </div>
  );
}

export default hot(App);
