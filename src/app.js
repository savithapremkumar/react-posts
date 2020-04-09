import React from "react";
import "./styles/main.scss";
import Posts from "./views/posts";

function App() {
  return (
    <div className="app">
      <div className="header">JSON Placeholder Posts Loader</div>
      <Posts />
    </div>
  );
}

export default App;
