import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageNotFound, Dasboard } from './pages';
import { NavBar } from './components';


function defaultWrapper(component: JSX.Element) {
  return (
    <NavBar>
      {component}
    </NavBar>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='*' element={<PageNotFound />} />
        <Route path="/" element={defaultWrapper(<Dasboard />)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
