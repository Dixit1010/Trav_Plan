import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { MapPin, ArrowRight, ChevronDown, Play, Star, Trophy, Heart, Check } from 'lucide-react'

const AMBER  = '#F7A800'
const SALMON = '#EF9070'

// ─── Cloud ────────────────────────────────────────────────────────────────────
function Cloud({ className = '', style = {} }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} style={style}>
      <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        <ellipse cx="160" cy="122" rx="148" ry="38" fill="white" fillOpacity="0.98" />
        <circle cx="88"  cy="98"  r="52" fill="white" />
        <circle cx="148" cy="72"  r="68" fill="white" />
        <circle cx="216" cy="82"  r="55" fill="white" />
        <circle cx="266" cy="105" r="40" fill="white" />
      </svg>
    </div>
  )
}

// ─── FloatCard ────────────────────────────────────────────────────────────────
function FloatCard({ name, sub, color = '#00A680', floatDelay = 0, initial }) {
  return (
    <motion.div initial={initial} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: floatDelay }}>
      <motion.div animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3.5 + floatDelay, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-black/[0.05]"
        style={{ minWidth: 190 }}>
        <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold"
          style={{ background: `linear-gradient(135deg,${color}40,${color}80)`, color }}>
          {name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#0D0D0D] font-semibold text-xs leading-tight truncate">{name}</p>
          <p className="text-[#ABABAB] text-[10px] flex items-center gap-0.5 mt-0.5">
            <MapPin className="w-2.5 h-2.5" /> {sub}
          </p>
        </div>
        <span className="text-[#ABABAB] text-sm font-bold tracking-widest flex-shrink-0">···</span>
      </motion.div>
    </motion.div>
  )
}

// ─── Portal ───────────────────────────────────────────────────────────────────
function Portal() {
  return (
    <div className="relative" style={{ width: 300, height: 460 }}>
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="absolute inset-0 rounded-[150px_150px_12px_12px] overflow-hidden shadow-2xl"
        style={{ background: 'linear-gradient(180deg,#5BA3D4 0%,#2C6EA6 35%,#1A3F6F 65%,#0D1E3D 100%)' }}>
        <div className="absolute top-6 left-0 right-0 flex justify-around opacity-80">
          <div className="w-20 h-8 bg-white/60 rounded-full blur-sm" />
          <div className="w-14 h-6 bg-white/50 rounded-full blur-sm mt-3" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[55%] overflow-hidden">
          <img src="/kashmir.png" alt="destination" className="w-full h-full object-cover object-top"
            onError={(e) => { e.currentTarget.src = '/hike.png' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1E3D] via-transparent to-transparent" />
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute -right-10 top-12 w-28 h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20"
        style={{ zIndex: -1 }}>
        <img src="/hike.png" alt="landmark" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </motion.div>
      <div className="absolute -left-52 top-16">
        <FloatCard name="Priya's Goa Trip" sub="Goa, India" color="#00A680" floatDelay={0.8} initial={{ opacity: 0, x: -20, scale: 1 }} />
      </div>
      <div className="absolute -left-48 bottom-24">
        <FloatCard name="Kashmir Explorer" sub="Kashmir, India" color="#F7A800" floatDelay={1.1} initial={{ opacity: 0, x: -20, scale: 1 }} />
      </div>
    </div>
  )
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ end, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let f = 0
    const t = setInterval(() => {
      f++; const v = (f / 80) * end
      setN(decimals ? parseFloat(v.toFixed(decimals)) : Math.floor(v))
      if (f >= 80) { setN(end); clearInterval(t) }
    }, 18)
    return () => clearInterval(t)
  }, [inView, end, decimals])
  return <span ref={ref}>{decimals ? n.toFixed(decimals) : n.toLocaleString()}{suffix}</span>
}

// ─── FadeUp ───────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}>
      {children}
    </motion.div>
  )
}

// ─── ChipCloud ────────────────────────────────────────────────────────────────
const CHIPS = [
  { label: 'Beach',          emoji: '🏖️', img: '/beach.png',   pos: { top: '4%',  left: '2%'  } },
  { label: 'Mountains',      emoji: '⛰️', img: '/hike.png',    pos: { top: '6%',  left: '42%' } },
  { label: 'Wildlife',       emoji: '🦁', img: '/kerala.png',  pos: { top: '4%',  right: '2%' } },
  { label: 'Resorts',        emoji: '🏨', img: '/island.png',  pos: { top: '34%', left: '0%'  } },
  { label: 'Historical',     emoji: '🏛️', img: '/desert.png',  pos: { top: '32%', left: '38%' } },
  { label: 'Fine Dining',    emoji: '🍽️', img: null,           pos: { top: '30%', right: '0%' } },
  { label: 'Water Sports',   emoji: '🤿', img: '/island.png',  pos: { top: '62%', left: '4%'  } },
  { label: 'Spa & Wellness', emoji: '💆', img: null,           pos: { top: '60%', right: '5%' } },
  { label: 'Cycling',        emoji: '🚴', img: null,           pos: { top: '64%', left: '45%' } },
]

function ChipCloud() {
  return (
    <div className="relative" style={{ height: 420 }}>
      {CHIPS.map((chip, i) => (
        <motion.div key={chip.label} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', ...chip.pos }}>
          <motion.div animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3 + i * 0.35, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2 bg-white rounded-full shadow-md px-3 py-2 border border-[#F0F0F0] hover:shadow-lg transition-shadow cursor-default whitespace-nowrap">
            {chip.img
              ? <img src={chip.img} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
              : <span className="text-lg w-8 h-8 flex items-center justify-center flex-shrink-0">{chip.emoji}</span>}
            <span className="text-sm font-semibold text-[#1A1A1A]">{chip.label}</span>
          </motion.div>
        </motion.div>
      ))}
      {/* <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-2xl border-2 border-[#E0E0E0] shadow-lg overflow-hidden">
        <div className="px-4 py-3"><p className="text-[#ABABAB] text-sm">Ask us anything…</p></div>
        <div className="flex items-center justify-between px-4 pb-3">
          <div className="flex gap-3 text-[#ABABAB] text-xl">
            <button className="hover:text-[#1A1A1A] transition-colors">+</button>
            <button className="hover:text-[#1A1A1A] transition-colors text-base">🙂</button>
          </div>
          <Link to="/create-trip">
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              className="w-9 h-9 bg-[#0D0D0D] rounded-full flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white" />
            </motion.button>
          </Link>
        </div>
      </motion.div> */}
    </div>
  )
}

// ─── MockHotelUI ──────────────────────────────────────────────────────────────
function MockHotelUI() {
  const ROOM_IMGS = [
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&h=120&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=200&h=120&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&h=120&fit=crop&auto=format',
  ]
  return (
    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-3xl shadow-2xl border border-[#E0E0E0] overflow-hidden w-full max-w-sm">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-11 bg-[#F8F8F8] border-r border-[#F0F0F0] flex flex-col items-center py-4 gap-4 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[#0D0D0D] flex items-center justify-center">
            <span className="text-white text-[10px] font-black">T</span>
          </div>
          {['○', '♡', '⊞', '🔔', '◎'].map((ic, i) => (
            <span key={i} className="text-[#CECECE] text-xs leading-none">{ic}</span>
          ))}
          <div className="mt-auto">
            <img src="https://ui-avatars.com/api/?name=D+K&background=F7A800&color=0D0D0D&size=28"
              alt="" className="w-7 h-7 rounded-full" />
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 p-3 min-w-0">
          <div className="flex items-center gap-1 mb-2 text-[#ABABAB]">
            <span className="text-sm font-mono">|←</span>
          </div>
          <div className="rounded-xl overflow-hidden border border-[#EEEEEE]">
            {/* Main image */}
            <div className="relative h-24">
              <img src="https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=200&fit=crop&auto=format"
                alt="hotel" className="w-full h-full object-cover" />
              <div className="absolute top-1.5 right-1.5 flex gap-1">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                  <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500" />
                </div>
                <div className="w-5 h-5 bg-[#0D0D0D] rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
            </div>
            <div className="p-2.5">
              <p className="font-bold text-[#0D0D0D] text-xs">Taj Lake Palace</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-2.5 h-2.5 fill-[#F7A800] text-[#F7A800]" />
                <span className="text-[10px] font-semibold">4.9</span>
                <span className="text-[10px] text-[#ABABAB]">· Luxury Hotel</span>
              </div>
              {/* Photo grid */}
              <div className="grid grid-cols-3 gap-0.5 mt-2">
                {ROOM_IMGS.map((img, i) => (
                  <div key={i} className="relative rounded-md overflow-hidden h-10">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {i === 2 && (
                      <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                        <span className="text-white text-[7px] font-bold text-center leading-tight">Show all<br />photos</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Dates */}
              <div className="flex gap-4 mt-2">
                <div>
                  <p className="text-[8px] text-[#ABABAB] font-medium">Check-In</p>
                  <p className="text-[10px] font-bold text-[#0D0D0D]">Jul 21</p>
                </div>
                <div>
                  <p className="text-[8px] text-[#ABABAB] font-medium">Check-Out</p>
                  <p className="text-[10px] font-bold text-[#0D0D0D]">Jul 23</p>
                </div>
              </div>
              <p className="text-[9px] text-[#ABABAB] mt-0.5">4 Travelers, 2 Rooms ∨</p>
              <button className="w-full mt-2 bg-[#0D0D0D] text-white text-[10px] font-bold py-2 rounded-lg">Book a room</button>
              <button className="w-full mt-1 bg-[#EEF2FF] text-[#0D0D0D] text-[10px] font-bold py-2 rounded-lg">+ Add to trip</button>
            </div>
          </div>
          {/* Chat bar */}
          <div className="mt-2 flex items-center gap-1.5 bg-[#F5F5F5] rounded-xl px-3 py-2">
            <span className="text-[#CECECE] text-[11px] flex-1">Ask anything…</span>
            <div className="w-4 h-4 bg-[#0D0D0D] rounded-full flex items-center justify-center">
              <ArrowRight className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const DESTINATIONS = [
  { name: 'Goa',         tag: 'Beach Paradise',   image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=420&h=300&fit=crop&auto=format', rating: 4.7, price: '₹8,000'  },
  { name: 'Manali',      tag: 'Mountain Escape',  image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=420&h=300&fit=crop&auto=format', rating: 4.8, price: '₹12,000' },
  { name: 'Kerala',      tag: 'Backwater Bliss',  image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=420&h=300&fit=crop&auto=format', rating: 4.9, price: '₹15,000' },
  { name: 'Kashmir',     tag: 'Snowy Heaven',     image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=420&h=300&fit=crop&auto=format',    rating: 4.8, price: '₹18,000' },
  { name: 'Andaman',     tag: 'Island Hopping',   image: 'https://images.unsplash.com/photo-1586944032279-b59ac929e9c0?w=420&h=300&fit=crop&auto=format', rating: 4.7, price: '₹22,000' },
  { name: 'Jaisalmer',   tag: 'Desert Magic',     image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=420&h=300&fit=crop&auto=format', rating: 4.6, price: '₹10,000' },
  { name: 'Jaipur',      tag: 'Pink City Glory',  image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=420&h=300&fit=crop&auto=format', rating: 4.8, price: '₹9,000'  },
  { name: 'Varanasi',    tag: 'Spiritual Ghats',  image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=420&h=300&fit=crop&auto=format',    rating: 4.7, price: '₹7,000'  },
  { name: 'Coorg',       tag: 'Coffee & Mist',    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=420&h=300&fit=crop&auto=format',    rating: 4.6, price: '₹11,000' },
  { name: 'Rishikesh',   tag: 'Adventure Capital',image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=420&h=300&fit=crop&auto=format', rating: 4.7, price: '₹6,000'  },
]

const INSPIRE_TRIPS = [
  { title: 'Taj Mahal & the Heart of Agra',                    img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=380&fit=crop&auto=format', user: 'Priya S',  color: 'E74C3C' },
  { title: 'Kerala Backwaters: God\'s Own Country',            img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=380&fit=crop&auto=format', user: 'Rahul M',  color: '3498DB' },
  { title: 'Goa: Sun, Sand & Spice',                          img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=380&fit=crop&auto=format', user: 'Anjali K', color: 'E67E22' },
  { title: 'Manali: Snow Peaks & Mountain Trails',             img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&h=380&fit=crop&auto=format', user: 'Vikram J', color: '1ABC9C' },
  { title: 'Spiritual Sunrise at the Varanasi Ghats',          img: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&h=380&fit=crop&auto=format', user: 'Neha R',   color: '9B59B6' },
  { title: 'Andaman: Turquoise Waters & Coral Reefs',          img: '/island.png',                                                                                   user: 'Arjun T',  color: 'F39C12' },
  { title: 'Jaipur: The Pink City Experience',                 img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&h=380&fit=crop&auto=format', user: 'Divya N',  color: '2ECC71' },
  { title: 'Jaisalmer: Golden Dunes of Rajasthan',             img: '/desert.png',                                                                                   user: 'Karan B',  color: 'F7A800' },
]

const TAG_PHOTOS = [
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=500&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&h=500&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&h=500&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=500&fit=crop&auto=format',
]

const COLLAGE = [
  { src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&h=220&fit=crop&auto=format', s: { top: '0%',    left: '0%',  width: 190, transform: 'rotate(-1.5deg)' } },
  { src: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=300&h=220&fit=crop&auto=format', s: { top: '0%',    left: '52%', width: 180, transform: 'rotate(2deg)'   } },
  { src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=220&fit=crop&auto=format', s: { top: '2%',    left: '27%', width: 175, transform: 'rotate(0.5deg)' } },
  { src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&h=220&fit=crop&auto=format', s: { bottom: '0%', left: '0%',  width: 195, transform: 'rotate(1.5deg)'  } },
  { src: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=300&h=220&fit=crop&auto=format',    s: { bottom: '0%', left: '42%', width: 200, transform: 'rotate(-2deg)'   } },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <div className="bg-white text-[#0D0D0D] overflow-x-hidden">

      {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen pt-20 overflow-hidden" style={{ background: AMBER }}>
        <div className="absolute bottom-12 left-0 right-0 h-20 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%,#B87A00,transparent)' }} />

        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 flex flex-col lg:flex-row items-start gap-10 lg:gap-0">
          {/* Left */}
          <div className="flex-1 relative z-10 lg:pt-6">
            <motion.div animate={{ x: [-6, 6, -6], y: [-3, 4, -3] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-16 top-28 w-72 pointer-events-none">
              <Cloud />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-6xl sm:text-7xl md:text-8xl font-black font-poppins leading-[0.92] tracking-[-2px] mb-6"
              style={{ color: '#0D0D0D' }}>
              Travel<br />differently.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative z-10 text-[#0D0D0D]/70 text-lg max-w-md leading-relaxed mb-8">
              TravPlan brings the world to you and empowers you to experience it{' '}
              <strong className="text-[#0D0D0D]">your way</strong>.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative z-10 flex items-center gap-3 flex-wrap">
              <Link to="/create-trip">
                <motion.button whileHover={{ scale: 1.03, backgroundColor: '#222' }} whileTap={{ scale: 0.97 }}
                  className="bg-[#0D0D0D] text-white font-bold px-7 py-3.5 rounded-full text-sm shadow-lg transition-colors">
                  Start planning
                </motion.button>
              </Link>
              <a href="#how-it-works">
                <motion.button whileHover={{ opacity: 0.7 }}
                  className="flex items-center gap-2.5 text-[#0D0D0D] font-semibold text-sm">
                  <div className="w-10 h-10 rounded-full bg-[#0D0D0D]/10 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-[#0D0D0D] text-[#0D0D0D]" />
                  </div>
                  See how it works
                </motion.button>
              </a>
            </motion.div>
          </div>

          {/* Right: Portal */}
          <div className="flex-1 flex justify-center lg:justify-end relative">
            <Portal />
          </div>
        </div>

        <motion.div animate={{ x: [0, 8, 0], y: [0, -5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-12 right-1/3 w-48 pointer-events-none">
          <Cloud />
        </motion.div>

        <motion.a href="#how-it-works" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#0D0D0D]/55 hover:text-[#0D0D0D] transition-colors">
          <span className="text-xs font-semibold">Learn more</span>
          <ChevronDown className="w-4 h-4" />
        </motion.a>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" fill="none" preserveAspectRatio="none" className="w-full block" style={{ height: 56 }}>
            <path d="M0,28 C400,56 1040,0 1440,28 L1440,56 L0,56 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══ STATS ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 px-6 border-b border-[#F0F0F0]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: 10000, s: '+', label: 'Trips Planned', dec: 0 },
            { n: 50,    s: '+', label: 'Destinations',  dec: 0 },
            { n: 4.9,   s: '★', label: 'Avg Rating',    dec: 1 },
            { n: 100,   s: '%', label: 'Always Free',   dec: 0 },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-black font-poppins text-[#0D0D0D]">
                <Counter end={stat.n} suffix={stat.s} decimals={stat.dec} />
              </div>
              <div className="text-xs text-[#ABABAB] mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black font-poppins text-[#0D0D0D]">How it Works</h2>
          </FadeUp>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 lg:max-w-sm">
              <FadeUp>
                <h3 className="text-3xl md:text-4xl font-black font-poppins text-[#0D0D0D] leading-tight mb-4">
                  Start Planning<br />with us.
                </h3>
                <p className="text-[#717171] text-base leading-relaxed">
                  Ask for suggestions for any destination or ask us for an entire itinerary.
                  Be as specific as you can about the experiences you like.
                </p>
                <Link to="/create-trip">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="mt-6 bg-[#0D0D0D] text-white font-bold px-6 py-3 rounded-full text-sm inline-flex items-center gap-2">
                    Try It Free <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </FadeUp>
            </div>
            <div className="flex-1 w-full">
              <ChipCloud />
            </div>
          </div>
        </div>
      </section>

      {/* ══ GET INSPIRED ════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8F8F8] py-20 px-6" id="destinations">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-3">
            <h2 className="text-5xl md:text-6xl font-black font-poppins text-[#0D0D0D]">Get inspired.</h2>
          </FadeUp>
          <FadeUp delay={0.1} className="text-center mb-12">
            <p className="text-[#717171] text-base">Explore popular destinations and start planning your TravPlan.</p>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {INSPIRE_TRIPS.map((trip, i) => (
              <FadeUp key={trip.title} delay={i * 0.06}>
                <Link to="/create-trip">
                  <motion.div whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group"
                    style={{ aspectRatio: '3/4' }}>
                    <img src={trip.img} alt={trip.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(trip.user)}&background=${trip.color}&color=fff&size=32`}
                        alt={trip.user} className="w-7 h-7 rounded-full border-2 border-white shadow" />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-sm leading-tight line-clamp-2">{trip.title}</p>
                    </div>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GET PERSONALIZED RECOMMENDATIONS ═══════════════════════════════════ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          <div className="flex-1 flex justify-center lg:justify-start">
            <MockHotelUI />
          </div>
          <div className="flex-1 lg:max-w-md">
            <FadeUp>
              <h2 className="text-4xl md:text-5xl font-black font-poppins text-[#0D0D0D] leading-tight mb-5">
                Get personalized recommendations.
              </h2>
              <p className="text-[#717171] text-base leading-relaxed mb-6">
                We'll provide personalized, actionable travel experiences based on your preferences.
                Browse photos, reviews, and Google Maps links. Favourite the places you love and build your perfect Indian itinerary.
              </p>
              <Link to="/create-trip">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="bg-[#0D0D0D] text-white font-bold px-7 py-3.5 rounded-full text-sm inline-flex items-center gap-2">
                  Try It Free <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ FEATURES GRID ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#F8F8F8] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black font-poppins text-[#0D0D0D] leading-tight">
              Everything you need<br />for your next adventure
            </h2>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '⚡', title: 'Instant plans',   desc: 'Full itinerary in 30 sec'  },
              { icon: '🏨', title: 'Hotel picks',     desc: 'Curated for your budget'   },
              { icon: '🗺️', title: 'Live map links',  desc: 'Navigate from every step'  },
              { icon: '💰', title: 'Always free',     desc: 'No subscriptions, ever'    },
              { icon: '👥', title: 'Group trips',     desc: 'Plan for any group size'   },
              { icon: '✈️', title: 'Any destination', desc: '50+ destinations covered'  },
              { icon: '📅', title: 'Day-by-day plan', desc: 'Detailed daily schedule'   },
              { icon: '🎯', title: 'Personalised',    desc: 'Tailored to your style'    },
            ].map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                whileHover={{ y: -4, borderColor: AMBER }}
                className="p-5 rounded-2xl border-2 border-[#F0F0F0] bg-white hover:shadow-md transition-all cursor-default">
                <span className="text-2xl mb-3 block">{f.icon}</span>
                <p className="font-bold text-[#0D0D0D] text-sm mb-1">{f.title}</p>
                <p className="text-[#ABABAB] text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT KIND OF TRAVELER ═══════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <FadeUp className="flex-1">
            <div className="rounded-3xl overflow-hidden aspect-square max-w-md mx-auto lg:mx-0 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=700&h=700&fit=crop&auto=format"
                alt="Indian heritage resort" className="w-full h-full object-cover" />
            </div>
          </FadeUp>
          <div className="flex-1 lg:max-w-sm">
            <FadeUp delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-black font-poppins text-[#0D0D0D] leading-tight mb-4">
                What kind of traveler are you?
              </h2>
              <p className="text-[#717171] text-base leading-relaxed mb-6">
                Take our quick travel quiz. We'll reveal your travel style and use your personal
                preferences to craft an itinerary you'll absolutely love.
              </p>
              <Link to="/create-trip">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="bg-[#0D0D0D] text-white font-bold px-8 py-3.5 rounded-full text-sm">
                  Find my style
                </motion.button>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ TRAVELLERS' CHOICE ══════════════════════════════════════════════════ */}
      <section className="bg-[#F8F8F8] py-14 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <FadeUp className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-[#F7A800]" />
            <h2 className="text-2xl font-black font-poppins text-[#0D0D0D]">Travellers' Choice 2025</h2>
          </FadeUp>
        </div>

        {/* Infinite marquee — duplicated for seamless loop */}
        <div className="overflow-hidden">
          <div className="marquee-track gap-4 px-4">
            {[...DESTINATIONS, ...DESTINATIONS].map((d, i) => (
              <Link to="/create-trip" key={`${d.name}-${i}`} className="flex-shrink-0">
                <div className="w-56 rounded-2xl overflow-hidden bg-white shadow-sm border border-[#E8E8E8] hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative h-36 overflow-hidden">
                    <img src={d.image} alt={d.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {i === 0 && (
                      <div className="absolute top-2 left-2 bg-[#F7A800] text-[#0D0D0D] text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Trophy className="w-2.5 h-2.5" /> Top Pick
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <p className="font-bold text-white text-sm">{d.name}</p>
                      <p className="text-white/70 text-xs">{d.tag}</p>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#F7A800] text-[#F7A800]" />
                      <span className="text-xs font-bold text-[#0D0D0D]">{d.rating}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#00A680]">from {d.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CREATE. INSPIRE. EARN. ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-20 pb-36 px-6" style={{ background: SALMON }}>
        <div className="absolute -bottom-10 -left-10 w-80 pointer-events-none opacity-90"><Cloud /></div>
        <div className="absolute -bottom-20 left-44 w-56 pointer-events-none opacity-65"><Cloud /></div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 relative z-10">
          <div className="flex-1 lg:max-w-sm">
            <FadeUp>
              <h2 className="text-5xl md:text-6xl font-black font-poppins text-[#0D0D0D] leading-[1.0] mb-5">
                Create.<br />Inspire.<br />Earn.
              </h2>
              <p className="text-[#0D0D0D]/70 text-base leading-relaxed mb-6">
                Love travelling and sharing your recommendations?
                Plan incredible trips with TravPlan and inspire others to explore the world!
              </p>
              <Link to="/create-trip">
                <motion.button whileHover={{ scale: 1.03, backgroundColor: '#333' }} whileTap={{ scale: 0.97 }}
                  className="bg-[#0D0D0D] text-white font-bold px-8 py-3.5 rounded-full text-sm transition-colors">
                  Start Planning
                </motion.button>
              </Link>
            </FadeUp>
          </div>

          {/* Photo collage */}
          <div className="flex-1 relative h-72 hidden lg:block">
            {COLLAGE.map((photo, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute rounded-2xl overflow-hidden shadow-xl"
                style={{ ...photo.s, position: 'absolute' }}>
                <img src={photo.src} alt="" className="object-cover" style={{ width: '100%', height: 145 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* spacer */}
      <div className="h-16 bg-white" />

      {/* ══ DARK ADVENTURE CTA ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden mx-4 md:mx-8 rounded-3xl" style={{ minHeight: 400 }}>
        <img src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1400&h=700&fit=crop&auto=format"
          alt="Himalayas" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 min-h-[400px] flex items-center px-6 py-20">
          <div className="max-w-6xl mx-auto w-full">
            <FadeUp>
              <p className="text-white/65 text-sm font-semibold uppercase tracking-widest mb-3">TravPlan for Web</p>
              <h2 className="text-5xl md:text-6xl font-black font-poppins text-white leading-tight mb-4">
                Plan your next<br />adventure.
              </h2>
              <p className="text-white/65 text-base max-w-md mb-8">
                Build your complete itinerary in seconds — hotels, activities, maps and more.
                Completely free, always.
              </p>
              <Link to="/create-trip">
                <motion.button whileHover={{ scale: 1.04, backgroundColor: '#F0F0F0' }} whileTap={{ scale: 0.96 }}
                  className="bg-white text-[#0D0D0D] font-bold px-8 py-3.5 rounded-full text-sm transition-colors">
                  Start Planning Free
                </motion.button>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* spacer */}
      <div className="h-8 bg-white" />

      {/* ══ TAG US ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black font-poppins text-[#0D0D0D]">
              Tag us on your<br />next trip.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TAG_PHOTOS.map((src, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="aspect-square rounded-3xl overflow-hidden shadow-sm">
                  <img src={src} alt={`Travel ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#0D0D0D] text-white py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: AMBER }}>
              <span className="text-[#0D0D0D] text-sm font-black">T</span>
            </div>
            <span className="font-black font-poppins text-white text-lg">TravPlan.</span>
          </div>
          <p className="text-white/35 text-sm text-center">
            © {new Date().getFullYear()} TravPlan. Built by{' '}
            <span className="text-white/60 font-medium">Dixit Kumar</span> · Powered by Gemini AI
          </p>
          <a href="mailto:dixitkumar300@gmail.com"
            className="text-sm text-white/35 hover:text-white/65 transition-colors">
            Contact
          </a>
        </div>
      </footer>

    </div>
  )
}
