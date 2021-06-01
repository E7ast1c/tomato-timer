import "./App.css";
import React from 'react';

import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <header className="App-header">
       {console.log(localStorage.getItem('user'))}
          <Main/>
      </header>
    </div>
  );
}

export default App;
