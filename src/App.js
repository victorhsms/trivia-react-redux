import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Logicas from './pages/Logicas'; // REMOVER ESSA LINHA E A ROTA '/logicas' APÓS A FINALIZAÇÃO DOS REQUISITOS 15 e 16

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/logicas" component={ Logicas } />
      </Switch>
    </div>
  );
}
