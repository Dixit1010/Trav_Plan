import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, MapPin, Calendar, Wallet, Users, Check, Plane, Trophy } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { generateTripPlan } from '@/service/AIModal'
import { SelectBudgetOptions, SelectTravelsList, PROMPT } from '@/constants/options'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/FirebaseConfig'
import { useNavigate } from 'react-router-dom'

// ─── Loading overlay ──────────────────────────────────────────────────────────
const LOAD_STEPS = [
  { icon: '🌍', text: 'Analyzing your destination...' },
  { icon: '🏨', text: 'Finding best hotels...' },
  { icon: '📅', text: 'Building your itinerary...' },
  { icon: '💎', text: 'Adding local hidden gems...' },
  { icon: '✈️', text: 'Finalizing your trip plan...' },
]

function Countdown({ seconds }) {
  const [left, setLeft] = useState(seconds)
  useEffect(() => {
    setLeft(seconds)
    const t = setInterval(() => setLeft((n) => { if (n <= 1) { clearInterval(t); return 0 } return n - 1 }), 1000)
    return () => clearInterval(t)
  }, [seconds])
  return <span>{left}s</span>
}

function LoadingOverlay({ loadStep, retryInfo }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl mb-6">✈️</motion.div>

        {retryInfo ? (
          <>
            <h2 className="text-2xl font-bold font-poppins text-[#1A1A1A] mb-1">Rate limit reached</h2>
            <p className="text-[#717171] text-sm mb-4">
              Attempt {retryInfo.attempt} of 3 — retrying in{' '}
              <span className="font-bold text-[#00A680]"><Countdown seconds={retryInfo.wait} /></span>
            </p>
            <div className="flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-4 py-2.5 rounded-xl mb-6">
              ⏳ Gemini free tier allows 15 requests/min. Hang tight…
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold font-poppins text-[#1A1A1A] mb-1">Planning your perfect trip…</h2>
            <p className="text-[#717171] text-sm mb-8">This takes about 20–30 seconds</p>
          </>
        )}

        <div className="space-y-3 text-left mb-6">
          {LOAD_STEPS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: loadStep >= i ? 1 : 0.25, x: 0 }}
              transition={{ delay: i * 0.1 }} className="flex items-center gap-3">
              <span className="text-xl w-7">{s.icon}</span>
              <span className={`text-sm flex-1 ${loadStep >= i ? 'text-[#1A1A1A]' : 'text-[#B0B0B0]'}`}>{s.text}</span>
              {loadStep > i
                ? <div className="w-5 h-5 rounded-full bg-[#00A680] flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-white" /></div>
                : loadStep === i
                  ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 rounded-full border-2 border-[#00A680] border-t-transparent flex-shrink-0" />
                  : null}
            </motion.div>
          ))}
        </div>

        <div className="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
          <motion.div className="h-full bg-[#00A680] rounded-full"
            animate={{ width: `${((loadStep + 1) / LOAD_STEPS.length) * 100}%` }}
            transition={{ duration: 0.5 }} />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Select card (TripAdvisor card style) ─────────────────────────────────────
function OptionCard({ icon, title, desc, sub, selected, onClick }) {
  return (
    <motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.97 }} onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 relative overflow-hidden ${
        selected
          ? 'border-[#00A680] bg-[#E6F7F3] shadow-sm'
          : 'border-[#E0E0E0] bg-white hover:border-[#00A680]/40 hover:bg-[#F9FFFE]'
      }`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm ${selected ? 'text-[#007A62]' : 'text-[#1A1A1A]'}`}>{title}</p>
          {desc && <p className="text-xs text-[#717171] mt-0.5">{desc}</p>}
          {sub && <p className="text-xs text-[#00A680] font-medium mt-1">{sub}</p>}
        </div>
        {selected && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="w-5 h-5 rounded-full bg-[#00A680] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </div>
    </motion.button>
  )
}

// ─── Steps ────────────────────────────────────────────────────────────────────
function StepDestination({ value, onChange }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🗺️</div>
        <h2 className="text-xl font-bold text-[#1A1A1A] font-poppins">Where do you want to go?</h2>
        <p className="text-[#717171] text-sm mt-1">Enter a city, region or country</p>
      </div>
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717171]" />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Goa, Paris, Tokyo…"
          className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-[#E0E0E0] text-[#1A1A1A] placeholder-[#ABABAB] text-sm focus:outline-none focus:border-[#00A680] transition-colors bg-white"
          autoFocus />
      </div>
    </div>
  )
}

function StepDuration({ value, onChange }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🗓️</div>
        <h2 className="text-xl font-bold text-[#1A1A1A] font-poppins">How many days?</h2>
        <p className="text-[#717171] text-sm mt-1">Select a duration or enter custom</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {[3, 5, 7, 10, 14].map((d) => (
          <button key={d} onClick={() => onChange(String(d))}
            className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
              value === String(d) ? 'border-[#00A680] bg-[#E6F7F3] text-[#007A62]' : 'border-[#E0E0E0] text-[#717171] hover:border-[#00A680]/50'
            }`}>
            {d} days
          </button>
        ))}
      </div>
      <div className="relative">
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717171]" />
        <input type="number" min="1" max="30" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder="Or enter custom days (1–30)"
          className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-[#E0E0E0] text-[#1A1A1A] placeholder-[#ABABAB] text-sm focus:outline-none focus:border-[#00A680] transition-colors bg-white" />
      </div>
    </div>
  )
}

function StepBudget({ value, onChange }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">💰</div>
        <h2 className="text-xl font-bold text-[#1A1A1A] font-poppins">What's your budget?</h2>
        <p className="text-[#717171] text-sm mt-1">AI tailors everything to your spend level</p>
      </div>
      <div className="space-y-3">
        {SelectBudgetOptions.map((item) => (
          <OptionCard key={item.title} icon={item.icon} title={item.title} desc={item.desc}
            selected={value === item.title} onClick={() => onChange(item.title)} />
        ))}
      </div>
    </div>
  )
}

function StepTravelers({ value, onChange }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">👥</div>
        <h2 className="text-xl font-bold text-[#1A1A1A] font-poppins">Who's coming along?</h2>
        <p className="text-[#717171] text-sm mt-1">We'll tailor activities to your group</p>
      </div>
      <div className="space-y-3">
        {SelectTravelsList.map((item) => (
          <OptionCard key={item.title} icon={item.icon} title={item.title} desc={item.desc}
            sub={item.people} selected={value === item.title} onClick={() => onChange(item.title)} />
        ))}
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const STEPS = ['Destination', 'Duration', 'Budget', 'Travelers']
const STEP_ICONS = [<MapPin className="w-4 h-4" />, <Calendar className="w-4 h-4" />, <Wallet className="w-4 h-4" />, <Users className="w-4 h-4" />]

const variants = {
  enter: (d) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: (d) => ({ x: d > 0 ? -100 : 100, opacity: 0, transition: { duration: 0.22 } }),
}

export default function CreateTrip() {
  const [step, setStep]     = useState(0)
  const [dir, setDir]       = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadStep, setLoadStep] = useState(0)
  const [retryInfo, setRetryInfo] = useState(null)
  const [formData, setFormData] = useState({ location: '', duration_of_trip: '', budget: '', travel_with: '' })
  const { toast }   = useToast()
  const navigate    = useNavigate()
  const timerRef    = useRef(null)

  const update = (k, v) => setFormData((p) => ({ ...p, [k]: v }))

  const valid = () => {
    if (step === 0) return formData.location.trim().length > 0
    if (step === 1) return formData.duration_of_trip.trim().length > 0
    if (step === 2) return formData.budget.length > 0
    return formData.travel_with.length > 0
  }

  const goNext = () => {
    if (!valid()) { toast({ variant: 'destructive', title: 'Missing info', description: 'Please fill this step first.' }); return }
    if (step < STEPS.length - 1) { setDir(1); setStep((s) => s + 1) }
    else handleGenerate()
  }
  const goBack = () => { setDir(-1); setStep((s) => s - 1) }

  const handleGenerate = async () => {
    setLoading(true); setLoadStep(0); setRetryInfo(null)
    let cur = 0
    timerRef.current = setInterval(() => { cur++; if (cur < LOAD_STEPS.length - 1) setLoadStep(cur); else clearInterval(timerRef.current) }, 5000)
    try {
      const prompt = PROMPT.replaceAll('{location}', formData.location)
        .replaceAll('{duration_of_trip}', formData.duration_of_trip)
        .replace('{budget}', formData.budget).replace('{travel_with}', formData.travel_with)
      const text = await generateTripPlan(prompt, (attempt, wait) => {
        setRetryInfo({ attempt, wait })
      })
      clearInterval(timerRef.current); setLoadStep(LOAD_STEPS.length - 1); setRetryInfo(null)
      const docid = Date.now().toString()
      await setDoc(doc(db, 'ai-trips', docid), { userSelection: formData, tripdata: JSON.parse(text), id: docid })
      setTimeout(() => navigate(`/view-trip/${docid}`), 600)
    } catch (err) {
      clearInterval(timerRef.current); setLoading(false); setRetryInfo(null)
      toast({
        variant: 'destructive',
        title: 'Generation failed',
        description: 'Could not generate trip after 3 attempts. Please try again in a minute.',
      })
    }
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  return (
    <>
      <AnimatePresence>{loading && <LoadingOverlay loadStep={loadStep} retryInfo={retryInfo} />}</AnimatePresence>

      <div className="min-h-screen bg-[#F5F5F5] pt-16">
        {/* Page header */}
        <div className="bg-white border-b border-[#E0E0E0] py-6 px-6">
          <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold font-poppins text-[#1A1A1A]">Plan your trip</h1>
            <p className="text-[#717171] text-sm mt-0.5">Tell us your preferences and AI will handle the rest</p>
          </div>
        </div>

        <div className="max-w-xl mx-auto px-4 py-8">

          {/* Step indicators */}
          <div className="flex items-center gap-0 mb-8">
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center gap-1 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                    i < step ? 'bg-[#00A680] text-white' :
                    i === step ? 'bg-[#00A680] text-white ring-4 ring-[#00A680]/20' :
                    'bg-[#E0E0E0] text-[#717171]'
                  }`}>
                    {i < step ? <Check className="w-4 h-4" /> : STEP_ICONS[i]}
                  </div>
                  <span className={`text-[10px] font-semibold hidden sm:block ${i === step ? 'text-[#00A680]' : 'text-[#B0B0B0]'}`}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mb-5 transition-colors ${i < step ? 'bg-[#00A680]' : 'bg-[#E0E0E0]'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Card */}
          <div className="bg-white/93 backdrop-blur-sm rounded-2xl shadow-card border border-[#E0E0E0]/60 overflow-hidden">
            {/* Progress stripe */}
            <div className="h-1 bg-[#E0E0E0]">
              <motion.div className="h-full bg-[#00A680]"
                animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.4 }} />
            </div>

            <div className="p-6 md:p-8 min-h-[380px] flex flex-col">
              <div className="flex-1">
                <AnimatePresence custom={dir} mode="wait">
                  <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit">
                    {step === 0 && <StepDestination value={formData.location} onChange={(v) => update('location', v)} />}
                    {step === 1 && <StepDuration value={formData.duration_of_trip} onChange={(v) => update('duration_of_trip', v)} />}
                    {step === 2 && <StepBudget value={formData.budget} onChange={(v) => update('budget', v)} />}
                    {step === 3 && <StepTravelers value={formData.travel_with} onChange={(v) => update('travel_with', v)} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Nav buttons */}
              <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-[#F0F0F0]">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={goBack}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-[#E0E0E0] text-[#717171] hover:border-[#ABABAB] transition-colors ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </motion.button>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={goNext}
                  className="ta-btn flex items-center gap-2 px-6 py-2.5 text-sm ml-auto">
                  {step === STEPS.length - 1
                    ? <><Plane className="w-4 h-4 -rotate-45" /> Generate Trip</>
                    : <>Continue <ArrowRight className="w-4 h-4" /></>}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Summary chips */}
          {Object.values(formData).some(Boolean) && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 mt-4 justify-center">
              {formData.location && <span className="flex items-center gap-1 text-xs bg-white border border-[#00A680]/30 text-[#007A62] px-3 py-1 rounded-full shadow-sm"><MapPin className="w-3 h-3" />{formData.location}</span>}
              {formData.duration_of_trip && <span className="flex items-center gap-1 text-xs bg-white border border-[#00A680]/30 text-[#007A62] px-3 py-1 rounded-full shadow-sm"><Calendar className="w-3 h-3" />{formData.duration_of_trip} days</span>}
              {formData.budget && <span className="flex items-center gap-1 text-xs bg-white border border-[#00A680]/30 text-[#007A62] px-3 py-1 rounded-full shadow-sm"><Wallet className="w-3 h-3" />{formData.budget}</span>}
              {formData.travel_with && <span className="flex items-center gap-1 text-xs bg-white border border-[#00A680]/30 text-[#007A62] px-3 py-1 rounded-full shadow-sm"><Users className="w-3 h-3" />{formData.travel_with}</span>}
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
