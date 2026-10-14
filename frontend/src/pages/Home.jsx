import React from "react";
import { useAuth } from "../hooks/useAuth"; // Custom Hook
import Navbar from "../components/home/Navbar";
import HeroSection from "../components/home/HeroSection";
import AgentShowcase from "../components/home/AgentShowcase";
import HowItWorks from "../components/home/HowItWork";
import Footer from "../components/home/Footer";

const Home = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={logout} />
      <HeroSection isLoggedIn={isLoggedIn} />
      <AgentShowcase />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Home;


