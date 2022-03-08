import './App.css';
import { BrowserRouter, Switch, Route,Link } from "react-router-dom";
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import React from 'react';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/chat" exact component={Chat} />
        </BrowserRouter>
      
    </div>
  );
}

export default App;
