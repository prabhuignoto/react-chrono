import React from "react";
// import { Crono } from "react-crono";
import { hot } from "react-hot-loader/root";
import "./App.css";
import { Crono } from "./components/react-crono";
import data from "./data";

function App() {
  return (
    <div className="App">
      <Crono items={data} mode="HORIZONTAL" />
    </div>
  );
}

export default hot(App);
