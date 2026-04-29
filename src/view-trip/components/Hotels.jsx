import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, Wallet, ExternalLink, Trophy, ArrowRight } from 'lucide-react'

const HOTEL_IMGS = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=240&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=240&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=240&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=240&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=240&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=240&fit=crop&auto=format',
]

function BubbleRating({ rating }) {
  const r = parseFloat(rating) || 4.5
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full ${i <= Math.floor(r) ? 'bg-[#00A680]' : 'bg-[#D0D0D0]'}`} />
        ))}
      </div>
      <span className="text-xs text-[#717171] font-medium">{r} of 5</span>
    </div>
  )
}

function HotelCard({ hotel, index }) {
  const [flipped, setFlipped] = useState(false)
  const img = HOTEL_IMGS[index % HOTEL_IMGS.length]
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((hotel.hotelName || '') + ' ' + (hotel.hotelAddress || ''))}`

  return (
    <div style={{ perspective: '1200px', height: '340px' }} className="cursor-pointer"
      onClick={() => setFlipped(f => !f)} title="Click to flip">
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: 'spring', stiffness: 90, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* ── FRONT ── */}
        <div style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 rounded-xl overflow-hidden bg-white/92 backdrop-blur-md border border-white/60 shadow-card group hover:shadow-card-hover transition-shadow">
          <div className="relative h-44 overflow-hidden">
            <img src={img} alt={hotel.hotelName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            {hotel.rating && (
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[#1A1A1A] text-xs font-bold px-2 py-0.5 rounded-full shadow-sm border border-[#E0E0E0]">
                <Star className="w-3 h-3 text-[#F5A623] fill-[#F5A623]" /> {hotel.rating}
              </div>
            )}
            {/* Best pick badge on first card */}
            {index === 0 && (
              <div className="absolute top-3 left-3">
                <span className="flex items-center gap-1 bg-[#FEF3DC] text-[#B07800] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#F5D896]">
                  <Trophy className="w-2.5 h-2.5" /> Top Pick
                </span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-bold text-[#1A1A1A] text-sm leading-tight mb-1 line-clamp-1">{hotel.hotelName}</h3>
            {hotel.rating && <BubbleRating rating={hotel.rating} />}
            <p className="text-[#717171] text-xs mt-1.5 line-clamp-2">{hotel.description || hotel.hotelAddress}</p>
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F0F0F0]">
              {hotel.price && (
                <div>
                  <span className="text-[10px] text-[#717171]">from</span>
                  <p className="text-sm font-bold text-[#1A1A1A]">{hotel.price}</p>
                </div>
              )}
              <span className="text-[10px] text-[#ABABAB] italic ml-auto">Tap to see more →</span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 rounded-xl overflow-hidden bg-white border border-[#00A680] shadow-card flex flex-col">
          {/* Green header */}
          <div className="bg-[#00A680] p-5 text-white">
            <div className="text-3xl mb-2">🏨</div>
            <h3 className="font-bold text-lg leading-tight">{hotel.hotelName}</h3>
            <p className="text-white/80 text-xs mt-1 flex items-start gap-1">
              <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" /> {hotel.hotelAddress}
            </p>
          </div>

          <div className="p-4 flex flex-col gap-3 flex-1">
            <div className="flex items-center justify-between">
              {hotel.price && (
                <div>
                  <p className="text-[10px] text-[#717171]">Starting from</p>
                  <p className="text-lg font-extrabold text-[#1A1A1A]">{hotel.price}</p>
                </div>
              )}
              {hotel.rating && (
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="w-4 h-4 text-[#F5A623] fill-[#F5A623]" />
                    <span className="font-bold text-[#1A1A1A]">{hotel.rating}</span>
                  </div>
                  <p className="text-[10px] text-[#717171]">Rating</p>
                </div>
              )}
            </div>

            <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#00A680] text-white text-sm font-semibold hover:bg-[#007A62] transition-colors mt-auto">
              <ExternalLink className="w-3.5 h-3.5" /> View on Maps
            </a>
            <p className="text-[10px] text-[#ABABAB] text-center">Tap to flip back</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }

export default function Hotels({ tripInfo }) {
  const hotels = tripInfo?.tripdata?.hotelOptions

  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>

      <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-card border border-[#E0E0E0] p-5 mb-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-bold font-poppins text-[#1A1A1A]">Hotel Recommendations</h2>
            <p className="text-[#717171] text-sm mt-0.5">Tap any card to see full details & map link</p>
          </div>
          {hotels?.length > 0 && (
            <span className="text-xs text-[#717171] bg-[#F5F5F5] px-3 py-1 rounded-full border border-[#E0E0E0]">
              {hotels.length} options found
            </span>
          )}
        </div>
      </motion.div>

      {!hotels?.length ? (
        <motion.p variants={fadeUp} className="text-[#717171] py-10 text-center bg-white rounded-xl border border-[#E0E0E0]">
          No hotel data available
        </motion.p>
      ) : (
        <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map((hotel, i) => (
            <motion.div key={hotel.hotelName || i} variants={fadeUp}>
              <HotelCard hotel={hotel} index={i} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  )
}
