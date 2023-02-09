import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Upload from './pages/Upload/Upload';
import Home from './pages/Home/Home';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
   </Provider>
  );
}

export default App;
