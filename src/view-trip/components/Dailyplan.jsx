import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Ticket, Navigation, ChevronDown, Calendar, MapPin } from 'lucide-react'

const PLACE_IMGS = [
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=320&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=320&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=320&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=320&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=320&h=200&fit=crop&auto=format',
]

const DAY_COLORS = ['#00A680', '#0084D4', '#9B59B6', '#E67E22', '#E74C3C', '#27AE60', '#2980B9']

function PlaceRow({ place, idx, dayIdx }) {
  const img = PLACE_IMGS[(dayIdx * 4 + idx) % PLACE_IMGS.length]
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.geoCoordinates || place.placeName || '')}`

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: idx * 0.07 }}
      className="flex gap-4 p-4 rounded-xl bg-[#F9F9F9] border border-[#EEEEEE] hover:border-[#00A680]/30 hover:bg-[#F5FFFC] transition-all group"
    >
      {/* Image */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
        <img src={img} alt={place.placeName}
          onError={(e) => { e.currentTarget.src = PLACE_IMGS[0] }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <h4 className="font-bold text-[#1A1A1A] text-sm leading-tight">{place.placeName}</h4>
        {place.placeDetails && (
          <p className="text-[#717171] text-xs leading-relaxed line-clamp-2">{place.placeDetails}</p>
        )}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {place.timeToTravel && (
            <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
              <Clock className="w-2.5 h-2.5" /> {place.timeToTravel}
            </span>
          )}
          {place.ticketPricing && (
            <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">
              <Ticket className="w-2.5 h-2.5" /> {place.ticketPricing}
            </span>
          )}
          {place.geoCoordinates && (
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs bg-[#E6F7F3] text-[#007A62] border border-[#B2E8DA] px-2 py-0.5 rounded-full font-medium hover:bg-[#00A680] hover:text-white transition-colors">
              <Navigation className="w-2.5 h-2.5" /> Navigate
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function DayBlock({ day, index }) {
  const [open, setOpen] = useState(index === 0)
  const color = DAY_COLORS[index % DAY_COLORS.length]
  const plans = day.plan || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/88 backdrop-blur-sm rounded-2xl border border-[#E0E0E0]/70 shadow-card overflow-hidden"
    >
      {/* Day header */}
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-4 p-4 md:p-5 text-left hover:bg-[#FAFAFA] transition-colors">
        {/* Day badge */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm"
          style={{ backgroundColor: color }}>
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[#1A1A1A] text-base font-poppins">{day.day || `Day ${index + 1}`}</h3>
          {day.bestTime && (
            <p className="text-xs text-[#717171] flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" /> Best time: {day.bestTime}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-[#ABABAB] hidden sm:block">{plans.length} places</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}
            className="w-7 h-7 rounded-full bg-[#F5F5F5] flex items-center justify-center border border-[#E0E0E0]">
            <ChevronDown className="w-4 h-4 text-[#717171]" />
          </motion.div>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden">
            <div className="px-4 md:px-5 pb-5 space-y-3 border-t border-[#F0F0F0] pt-3">
              {plans.length > 0 ? plans.map((place, pi) => (
                <PlaceRow key={place.placeName || pi} place={place} idx={pi} dayIdx={index} />
              )) : (
                <p className="text-[#ABABAB] text-sm text-center py-4">No places planned for this day</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp  = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }

export default function Dailyplan({ tripInfo }) {
  const itinerary = tripInfo?.tripdata?.itinerary

  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>

      <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-card border border-[#E0E0E0] p-5 mb-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-bold font-poppins text-[#1A1A1A]">Day-by-Day Itinerary</h2>
            <p className="text-[#717171] text-sm mt-0.5">Tap each day to expand the schedule</p>
          </div>
          {itinerary?.length > 0 && (
            <span className="text-xs text-[#717171] bg-[#F5F5F5] px-3 py-1 rounded-full border border-[#E0E0E0]">
              {itinerary.length} days planned
            </span>
          )}
        </div>
      </motion.div>

      {!itinerary?.length ? (
        <motion.div variants={fadeUp}
          className="py-14 text-center bg-white rounded-2xl border border-[#E0E0E0] shadow-card">
          <Calendar className="w-10 h-10 text-[#D0D0D0] mx-auto mb-3" />
          <p className="text-[#ABABAB]">Itinerary data not available</p>
        </motion.div>
      ) : (
        <motion.div variants={stagger} className="space-y-3">
          {itinerary.map((day, i) => (
            <motion.div key={day.day || i} variants={fadeUp}>
              <DayBlock day={day} index={i} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  )
}
