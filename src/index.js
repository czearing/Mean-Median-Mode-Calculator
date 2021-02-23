import { StrictMode } from "react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import MeanCalculator from "./MeanCalculator";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <MeanCalculator />
  </StrictMode>,
  rootElement
);
