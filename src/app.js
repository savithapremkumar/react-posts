import React from "react";
import "./styles/main.scss";
import Posts from "./views/posts";
import Header from "./components/Header/index";
import { SiteHeading } from "./constants/messages";

function App() {
  return (
    <div className="app">
      <Header heading={SiteHeading} />
      <Posts />
    </div>
  );
}

export default App;
