import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Clock, Wallet, Users, Share2, Trophy } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const HERO_FALLBACK = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&h=500&fit=crop&auto=format'

function BubbleRating({ rating = 4.5 }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-full ${i <= Math.floor(rating) ? 'bg-[#00A680]' : i === Math.ceil(rating) && rating % 1 >= 0.3 ? 'bg-[#00A680]/50' : 'bg-[#D0D0D0]'}`} />
        ))}
      </div>
      <span className="text-sm font-semibold text-[#1A1A1A]">{rating} of 5</span>
    </div>
  )
}

const TAGS = [
  { key: 'duration_of_trip', icon: <Clock className="w-3.5 h-3.5" />, suffix: ' Days',     color: 'bg-blue-50   text-blue-700   border-blue-200' },
  { key: 'budget',           icon: <Wallet className="w-3.5 h-3.5" />, suffix: ' Budget',   color: 'bg-green-50  text-green-700  border-green-200' },
  { key: 'travel_with',      icon: <Users  className="w-3.5 h-3.5" />, suffix: '',  prefix: 'With ', color: 'bg-orange-50 text-orange-700 border-orange-200' },
]

export default function InfoSection({ tripInfo }) {
  const ref = useRef(null)
  const { toast } = useToast()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  if (!tripInfo?.userSelection) return (
    <div className="h-60 rounded-2xl bg-[#E0E0E0] animate-pulse flex items-center justify-center text-[#717171]">
      Loading trip info…
    </div>
  )

  const { location, duration_of_trip, budget, travel_with } = tripInfo.userSelection

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `Trip to ${location}`, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({ title: 'Link copied!', description: 'Share it with your travel crew.' })
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-5">

      {/* Parallax hero image */}
      <div ref={ref} className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-card">
        <motion.img
          src={`https://source.unsplash.com/featured/1400x500/?${encodeURIComponent(location)},travel,landmark`}
          alt={location}
          style={{ y: imgY }}
          onError={(e) => { e.currentTarget.src = HERO_FALLBACK }}
          className="w-full h-[120%] object-cover -mt-[10%]"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        {/* Location pill */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#1A1A1A] px-3 py-1.5 rounded-full text-sm font-semibold shadow">
            <MapPin className="w-3.5 h-3.5 text-[#00A680]" /> {location}
          </div>
        </div>

        {/* Travellers' Choice badge */}
        <div className="absolute top-4 right-4">
          <span className="flex items-center gap-1 bg-[#FEF3DC] text-[#B07800] text-[11px] font-bold px-2.5 py-1.5 rounded-full border border-[#F5D896] shadow-sm">
            <Trophy className="w-3 h-3" /> Travellers' Choice
          </span>
        </div>
      </div>

      {/* Title row */}
      <div className="bg-white rounded-2xl shadow-card border border-[#E0E0E0] p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold font-poppins text-[#1A1A1A]">{location}</h1>

            {/* Bubble rating */}
            <BubbleRating rating={4.7} />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {TAGS.map(({ key, icon, suffix, prefix = '', color }) => {
                const val = tripInfo.userSelection[key]
                if (!val) return null
                return (
                  <motion.span key={key} whileHover={{ scale: 1.04 }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
                    {icon} {prefix}{val}{suffix}
                  </motion.span>
                )
              })}
            </div>
          </div>

          {/* Share */}
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#E0E0E0] text-[#717171] text-sm font-semibold hover:border-[#00A680] hover:text-[#00A680] transition-colors self-start">
            <Share2 className="w-4 h-4" /> Share
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
