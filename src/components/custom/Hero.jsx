import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import AnimatedGradientText from "../ui/animated-gradient-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { motion, useAnimation } from "framer-motion";
import { AuroraText } from "@/components/magicui/aurora-text";

function Hero() {
  const trips = [
    {
      title: "Beachside Escape",
      location: "Goa",
      date: "25th July 2025",
      duration: "3 days",
      budget: "₹12,000",
      image: "/beach.png",
    },
    {
      title: "Mountain Hike",
      location: "Manali",
      date: "10th August 2025",
      duration: "5 days",
      budget: "₹18,000",
      image: "/hike.png",
    },
    {
      title: "Desert Adventure",
      location: "Jaisalmer",
      date: "5th September 2025",
      duration: "4 days",
      budget: "₹15,000",
      image: "/desert.png",
    },
    {
      title: "Backwaters Bliss",
      location: "Kerala",
      date: "15th October 2025",
      duration: "6 days",
      budget: "₹20,000",
      image: "/kerala.png",
    },
    {
      title: "Snowy Escape",
      location: "Kashmir",
      date: "2nd December 2025",
      duration: "5 days",
      budget: "₹22,000",
      image: "/kashmir.png",
    },
    {
      title: "Island Hopping",
      location: "Andaman",
      date: "20th Jan 2026",
      duration: "7 days",
      budget: "₹30,000",
      image: "/island.png",
    },
    {
      title: "Valley of Flowers",
      location: "Uttarakhand",
      date: "18th March 2026",
      duration: "3 days",
      budget: "₹10,000",
      image: "/kashmir.png",
    },
  ];

  const duplicatedTrips = [...trips, ...trips];

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        duration: 30,
        ease: "linear",
      },
    });
  }, [controls]);

  const handleMouseEnter = () => controls.stop();
  const handleMouseLeave = () => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        duration: 30,
        ease: "linear",
      },
    });
  };

  return (
    <div className="flex flex-col items-center pt-24 gap-5 min-h-screen w-full overflow-hidden">
      <motion.div
        className="flex flex-col items-center gap-5"
        initial={{ y: "10%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
          <span
            className={cn(
              "inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent"
            )}
          >
            Personalized Itineraries at your Fingertips →
          </span>
        </AnimatedGradientText>

        <h1 className="font-bold text-center text-5xl md:text-7xl">
          Discover Your Next <br />
          <AuroraText>Adventure</AuroraText> with AI
        </h1>

        <p className="text-gray-500 text-center max-w-md md:max-w-xl">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>

        <Link to="/create-trip">
          <RainbowButton className="h-12 hover:scale-105 transition-transform duration-300">
            Get Started It's Free
          </RainbowButton>
        </Link>

        <GridPattern
          width={50}
          height={50}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
          )}
        />

        {/* Glowing Image */}
        <div className="transition-transform duration-500 hover:scale-105 rounded-xl p-1 border border-black hover:shadow-[0_0_40px_rgba(71,170,255,0.9)] mt-8">
          <img
            src="/demo.png"
            className="max-w-md md:max-w-5xl rounded-xl animate-float"
            alt="Demo"
          />
        </div>

        {/* Marquee Cards with hover pause */}
        <div
          className="relative w-full mt-12 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div className="flex gap-6 w-max px-6" animate={controls}>
            {duplicatedTrips.map((trip, idx) => (
              <div
                key={idx}
                className="transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,170,64,0.4)] rounded-xl border border-gray-200 p-4 bg-white min-w-[280px] max-w-sm"
              >
                <img
                  src={trip.image}
                  alt="trip"
                  className="rounded-lg h-48 w-full object-cover mb-3"
                />
                <h2 className="text-xl font-bold">{trip.title}</h2>
                <p className="text-sm text-gray-500">{trip.location}</p>
                <p className="text-sm mt-1">🗓️ {trip.date}</p>
                <p className="text-sm">📍 Duration: {trip.duration}</p>
                <p className="text-sm">💰 Budget: {trip.budget}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ✅ Stylish Footer Section */}
<footer className="w-full bg-gray-100 border-t border-gray-300 mt-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
    <p className="text-gray-600 text-sm text-center md:text-left">
      © {new Date().getFullYear()} <span className="font-semibold">AI Trip Planner</span>. All rights reserved.
    </p>
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span>Made with ❤️ by <span className="font-medium">Dixit Kumar</span></span>
      <span className="hidden md:inline">|</span>
      <a
        href="mailto:dixitkumar300@gmail.com"
        className="text-blue-500 hover:underline"
      >
        Contact
      </a>
    </div>
  </div>
</footer>

      </motion.div>
    </div>
  );
}

export default Hero;
