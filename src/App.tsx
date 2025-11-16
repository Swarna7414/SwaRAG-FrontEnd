import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import DataBase from "../src/Pages/DataBase";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/database" element={<DataBase />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;