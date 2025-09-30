import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import People from "./pages/People";
import Faculty from "./pages/PeoplePage/Faculty";
import Staff from "./pages/PeoplePage/Staff";
import Students from "./pages/PeoplePage/Students";
import Resources from "./pages/Resources";
import Initiatives from "./pages/Initiatives";
import Affiliates from "./pages/Affiliates";
import Contact from "./pages/Contact";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/people" element={<People />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/students" element={<Students />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/initiatives" element={<Initiatives />} />
          <Route path="/affiliates" element={<Affiliates />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;