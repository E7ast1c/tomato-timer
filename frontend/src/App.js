import "./App.css";
import React from 'react';

import Main from "./components/Main";

function App() {
  const baseAdress = process.env;
  console.warn(baseAdress)
  return (
    <div className="App">
      <header className="App-header">
          <Main/>
      </header>
    </div>
  );
}

export default App;
