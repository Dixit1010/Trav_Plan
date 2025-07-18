// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import { Input } from "@/components/ui/input"
// import { useToast } from '@/components/ui/use-toast'
// import { chatSession } from '@/service/AIModal'
// import { Button } from "@/components/ui/button"
// import { SelectBudgetOptions, SelectTravelsList, PROMPT } from '@/constants/options'
// import { doc, setDoc } from "firebase/firestore"
// import { db } from '@/service/FirebaseConfig'

// import { useNavigate } from 'react-router-dom'

// import { ring2 } from 'ldrs'


// function CreateTrip() {

//   const [place, setPlace] = React.useState('')

//   const [days, setDays] = React.useState('')

//   const [formData, setFormData] = React.useState([])


//   const { toast } = useToast()

//   const [loading, setLoading] = useState(false)

//   const router = useNavigate();

//   const [openDialog, setOpenDialog] = React.useState(false)

//   useEffect(()=>{
//     ring2.register()
//   },[])

//   const handleInputChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value
//     })
//   }

//   let docid;

//   const saveTripData = async (tripdata) => {
//     docid = Date.now().toString()
//     setLoading(true)
//     await setDoc(doc(db, "ai-trips", docid), {
//       userSelection: formData,
//       tripdata: JSON.parse(tripdata),
//       id: docid
//     });
//     setLoading(false)
//   }

//   const handleFormSubmit = async () => {
//     if (formData.location && formData.duration_of_trip && formData.budget && formData.travel_with) {
//       toast({
//         title: 'Success',
//         description: 'Form Submitted Successfully',
//       })

//       setLoading(true)
//       const finalPrompt = PROMPT.replace('{location}', formData?.location)
//         .replace('{duration_of_trip}', formData?.duration_of_trip)
//         .replace('{budget}', formData?.budget)
//         .replace('{travel_with}', formData?.travel_with)
//         .replace('{duration_of_trip}', formData?.duration_of_trip)
//       const result = await chatSession.sendMessage(finalPrompt)
//       console.log(result?.response?.text())
//       setLoading(false)
//       saveTripData(result?.response?.text())
//       router(`/view-trip/${docid}`)
//     } else {
//       toast({
//         variant: "destructive",
//         title: 'Error',
//         description: 'Please fill all the fields',
//       })
//     }
//   }
//   //Rendering the form
//   return (
//     <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10 max-w-4xl mx-auto'>
//       <h2 className='font-bold text-3xl'># Tell us your travel preferences 🏖️</h2>
//       <p className='mt-3 text-gray-500 text-xl'>Fill out a quick survey to help us understand your travel preferences and requirements. This will help us create a personalized itinerary for you.</p>
//       <div className='mt-10'>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>What is your Destination of choice</h2>
//           <Input type="text" placeholder={place ? place : "Your Destination"} onChange={(e) => { setPlace(e.target.value); handleInputChange('location', e.target.value) }} />
//         </div>
//       </div>
//       <div>
//         <h2 className='text-xl my-3 font-medium'>Durration of stay: </h2>
//         <Input type="number" placeholder={days ? days : "Eg: 2"} onChange={(e) => { (e.target.value); handleInputChange('duration_of_trip', e.target.value) }} />
//       </div>

//       <div>
//         <h2 className='text-xl my-3 font-medium'>What is your budget ?</h2>
//         <div className='grid grid-cols-3 gap-5 mt-5'>
//           {SelectBudgetOptions.map((item, index) => (
//             <div key={index}
//               onClick={() => handleInputChange('budget', item.title)}
//               className={`p-4 cursor-pointer border rounded-lg shadow-sm hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
//               <h2 className='text-4xl '>{item.icon}</h2>
//               <h2 className='font-bold text-lg'>{item.title}</h2>
//               <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h2 className='text-xl my-3 font-medium'>Whome do you plan to travel with</h2>
//         <div className='grid grid-cols-3 gap-5 mt-5'>
//           {SelectTravelsList.map((item, index) => (
//             <div key={index}
//               onClick={() => handleInputChange('travel_with', item.title)}
//               className={`p-4 cursor-pointer border rounded-lg shadow-sm hover:shadow-lg ${formData?.travel_with == item.title && 'shadow-lg border-black'}`}>
//               <h2 className='text-4xl '>{item.icon}</h2>
//               <h2 className='font-bold text-lg'>{item.title}</h2>
//               <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//               <h2 className='text-lg font-bold'>{item.people}</h2>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className='my-10 flex flex-col items-center'>
//         <Button
//           disabled={loading}
//           className='w-full'
//           onClick={handleFormSubmit}>
//           {loading ?<div><l-ring-2 size="25" stroke="3" stroke-length="0.25" bg-opacity="0.1" speed="0.8" color="white" ></l-ring-2> </div>: "Generate Trip"}
//         </Button>

//       </div>
//     </div>
//   )
// }

// export default CreateTrip


import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { useToast } from '@/components/ui/use-toast'
import { chatSession } from '@/service/AIModal'
import { Button } from "@/components/ui/button"
import { SelectBudgetOptions, SelectTravelsList, PROMPT } from '@/constants/options'
import { doc, setDoc } from "firebase/firestore"
import { db } from '@/service/FirebaseConfig'
import { useNavigate } from 'react-router-dom'
import { ring2 } from 'ldrs'
import { motion } from 'framer-motion'

ring2.register()

function CreateTrip() {
  const [place, setPlace] = useState('')
  const [days, setDays] = useState('')
  const [formData, setFormData] = useState({})
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const saveTripData = async (tripdata) => {
    const docid = Date.now().toString()
    await setDoc(doc(db, "ai-trips", docid), {
      userSelection: formData,
      tripdata: JSON.parse(tripdata),
      id: docid
    })
    router(`/view-trip/${docid}`)
  }

  const handleFormSubmit = async () => {
    if (formData.location && formData.duration_of_trip && formData.budget && formData.travel_with) {
      toast({ title: 'Success', description: 'Form Submitted Successfully' })
      setLoading(true)

      const finalPrompt = PROMPT
        .replaceAll('{location}', formData.location)
        .replaceAll('{duration_of_trip}', formData.duration_of_trip)
        .replace('{budget}', formData.budget)
        .replace('{travel_with}', formData.travel_with)

      const result = await chatSession.sendMessage(finalPrompt)
      setLoading(false)
      saveTripData(result?.response?.text())
    } else {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Please fill all the fields',
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10 max-w-4xl mx-auto'
    >
      <h2 className='font-bold text-3xl'># Tell us your travel preferences 🏖️</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Fill out a quick survey to help us understand your travel preferences and requirements. This will help us create a personalized itinerary for you.
      </p>

      <div className='mt-10 space-y-8'>

       {/* Destination */}
<motion.div whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.1 }}>
  <h2 className='text-xl font-medium'>Where do you want to go?</h2>
  <Input
    type="text"
    placeholder="Your Destination"
    className="transition duration-300 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:shadow-[0_0_20px_rgba(71,170,255,0.9)]"
    onChange={(e) => {
      setPlace(e.target.value)
      handleInputChange('location', e.target.value)
    }}
  />
</motion.div>

{/* Duration */}
<motion.div whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.15 }}>
  <h2 className='text-xl font-medium'>Duration of stay (in days):</h2>
  <Input
    type="number"
    placeholder="Eg: 2"
    className="transition duration-300 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:shadow-[0_0_20px_rgba(71,170,255,0.9)]"
    onChange={(e) => {
      setDays(e.target.value)
      handleInputChange('duration_of_trip', e.target.value)
    }}
  />
</motion.div>


       {/* Budget */}
<motion.div whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.2 }}>
  <h2 className='text-xl font-medium mb-2'>What's your budget?</h2>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
    {SelectBudgetOptions.map((item, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.03 }}
        onClick={() => handleInputChange('budget', item.title)}
        className={`cursor-pointer p-4 rounded-lg border transition duration-300 ${
          formData?.budget === item.title
            ? 'border-black shadow-[0_0_25px_rgba(71,170,255,0.9)]'
            : 'hover:shadow-[0_0_20px_rgba(71,170,255,0.5)]'
        }`}
      >
        <div className="text-4xl mb-2">{item.icon}</div>
        <h3 className='font-semibold text-lg'>{item.title}</h3>
        <p className='text-sm text-gray-500'>{item.desc}</p>
      </motion.div>
    ))}
  </div>
</motion.div>

{/* Travel With */}
<motion.div whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.25 }}>
  <h2 className='text-xl font-medium mb-2'>Who are you travelling with?</h2>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
    {SelectTravelsList.map((item, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.03 }}
        onClick={() => handleInputChange('travel_with', item.title)}
        className={`cursor-pointer p-4 rounded-lg border transition duration-300 ${
          formData?.travel_with === item.title
            ? 'border-black shadow-[0_0_25px_rgba(71,170,255,0.9)]'
            : 'hover:shadow-[0_0_20px_rgba(71,170,255,0.5)]'
        }`}
      >
        <div className="text-4xl mb-2">{item.icon}</div>
        <h3 className='font-semibold text-lg'>{item.title}</h3>
        <p className='text-sm text-gray-500'>{item.desc}</p>
        <p className='text-base font-bold mt-1'>{item.people}</p>
      </motion.div>
    ))}
  </div>
</motion.div>


       {/* Submit Button */}
<div className='my-10'>
  <Button
    disabled={loading}
    className='w-full flex justify-center items-center gap-2 font-semibold text-base py-3 rounded-lg transition-all duration-300 bg-black text-white hover:bg-gray-800'
    onClick={handleFormSubmit}
  >
    {loading ? (
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
      />
    ) : (
      "🚀 Generate Trip"
    )}
  </Button>
</div>
        {/* ✅ Stylish Full-Width Footer Section */}
<footer className="w-full bg-gray-100 border-t border-gray-300 mt-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto py-10 flex flex-col md:flex-row items-center justify-between gap-4">
    <p className="text-gray-600 text-sm text-center md:text-left">
      © {new Date().getFullYear()} <span className="font-semibold">AI Trip Planner</span>. All rights reserved.
    </p>
    <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap justify-center md:justify-end">
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

      </div>
    </motion.div>
  )
}

export default CreateTrip
