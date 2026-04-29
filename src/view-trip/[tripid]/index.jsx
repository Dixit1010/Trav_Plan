import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/service/FirebaseConfig'
import { motion } from 'framer-motion'
import InfoSection from '../components/InfoSection'
import Hotels from '../components/Hotels'
import Dailyplan from '../components/Dailyplan'

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-[#E0E0E0] rounded-xl ${className}`} />
}

function TripSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Skeleton className="h-72 w-full rounded-2xl" />
      <div className="space-y-3">
        <Skeleton className="h-7 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-6 w-44" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
      </div>
      <Skeleton className="h-6 w-44" />
      {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
    </div>
  )
}

export default function ViewTrip() {
  const [tripData, setTripData] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)
  const { tripid }  = useParams()

  useEffect(() => {
    if (!tripid) return
    setLoading(true)
    getDoc(doc(db, 'ai-trips', tripid)).then((snap) => {
      if (snap.exists()) setTripData(snap.data())
      else setNotFound(true)
      setLoading(false)
    })
  }, [tripid])

  if (loading) return <div className="min-h-screen bg-[#F5F5F5] pt-16"><TripSkeleton /></div>

  if (notFound) return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center gap-4 pt-16">
      <div className="text-6xl">😕</div>
      <h2 className="text-2xl font-bold text-[#1A1A1A] font-poppins">Trip not found</h2>
      <p className="text-[#717171]">No trip found with ID: {tripid}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-16">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <InfoSection tripInfo={tripData} />
        <Hotels tripInfo={tripData} />
        <Dailyplan tripInfo={tripData} />
      </motion.div>
    </div>
  )
}
