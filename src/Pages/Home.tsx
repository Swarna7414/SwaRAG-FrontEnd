import React from 'react';
import bgimage from "../assets/BackLogo.png";
// import anotherbgimage from "../assets/logo.svg";

const Home: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <img src={bgimage} alt="bgimage" />
        {/* <img src={anotherbgimage} alt="bgimage" /> */}
      </div>
    </div>
  );
};

export default Home;
