import React from "react";
import "./styles/main.scss";
import Posts from "./views/posts";
import Header from "./components/Header/index";
import ScrollingWrapper from "./components/ScrollToTop/index";
import { SiteHeading } from "./constants/messages";

function App() {
  return (
    <div className="app">
      <Header heading={SiteHeading} />
      <ScrollingWrapper>
        <Posts />
      </ScrollingWrapper>
    </div>
  );
}

export default App;
