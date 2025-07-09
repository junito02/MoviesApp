import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Componentes/Header";
import MovieDetail from "./Componentes/MovieDetail";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
