import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Users from "./components/Users"
import User from "./components/User"

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Users} />
      <Route path="/:id" component={User} />
    </div>
  );
}

export default App;
