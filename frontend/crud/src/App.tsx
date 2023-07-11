import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageNotFound, DasboardPage,UserDetailsPage } from './pages';
import { Alert, NavBar } from './components';
import { Config } from './meta';


function defaultWrapper(component: JSX.Element) {
  return (
    <Alert duration={Config.ALERT_DURATION}>
      <NavBar>
        {component}
      </NavBar>
    </Alert>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='*' element={<PageNotFound />} />
        <Route path="/" element={defaultWrapper(<DasboardPage />)} />
        <Route path="/user/:id" element={defaultWrapper(<UserDetailsPage />)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
