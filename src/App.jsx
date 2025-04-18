import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playing from "./Pages/Playing";
import Popular from "./Pages/Popular";
import Upcoming from "./Pages/Upcoming";
import "./App.css";
import MovieDetail from "./Componentes/MovieDetail";
import Header from "./Componentes/Header";

const App = () => (
  <Router>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#060d1e] to-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/playing" element={<Playing />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/" element={<Playing />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
