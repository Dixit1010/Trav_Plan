import React, { useEffect } from "react";
import "./App.css";
import Lenis from "lenis";
import Hero from "./components/custom/Hero";
import CreateTrip from "./create-trip";
import ViewTrip from "./view-trip/[tripid]";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    let raf
    const animate = (time) => { lenis.raf(time); raf = requestAnimationFrame(animate) }
    raf = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/"                  element={<Hero />} />
        <Route path="/create-trip"       element={<CreateTrip />} />
        <Route path="/view-trip/:tripid" element={<ViewTrip />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
