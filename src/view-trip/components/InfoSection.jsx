import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import React from 'react';

function InfoSection({ tripInfo }) {

    if (!tripInfo || !tripInfo.userSelection) {
        return <div>Information is not available</div>;
    }

    return (
        <div>
            <div className="transition-transform duration-500 hover:scale-105 rounded-xl p-1 border border-sky-400 shadow-lg hover:shadow-[0_0_40px_rgba(0,191,255,0.6)] animate-float mt-6">
  <img
    src="https://wallpapers.com/images/hd/aeroplane-dark-blue-cloudy-sky-view-q0i4v3qwslowbqpv.jpg"
    alt="Airplane view"
    className="h-[340px] w-full object-cover rounded-xl"
  />
</div>


            <div className='flex justify-between items-center flex-wrap mt-4'>

                {/* Glowing Location */}
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='text-3xl font-bold font-poppins bg-gradient-to-r from-blue-500 to-sky-400 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_12px_rgba(0,212,255,0.8)]'>
                        {tripInfo.userSelection.location}
                    </h2>

                    {/* Glowing Tags */}
                    <div className='flex gap-3 flex-wrap'>
                        <h2 className='p-1 px-3 rounded-xl text-xs md:text-sm text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-[0_0_10px_rgba(219,39,119,0.9)] transition-all'>
                            {tripInfo.userSelection.duration_of_trip} Days
                        </h2>
                        <h2 className='p-1 px-3 rounded-xl text-xs md:text-sm text-white bg-gradient-to-r from-green-400 to-emerald-500 shadow-md hover:shadow-[0_0_10px_rgba(34,197,94,0.8)] transition-all'>
                            ₹{tripInfo.userSelection.budget} Budget
                        </h2>
                        <h2 className='p-1 px-3 rounded-xl text-xs md:text-sm text-white bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md hover:shadow-[0_0_10px_rgba(251,191,36,0.9)] transition-all'>
                            Traveling along {tripInfo.userSelection.travel_with}
                        </h2>
                    </div>
                </div>

                {/* Glowing Button */}
                <Button className="flex gap-2 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 shadow-md hover:shadow-[0_0_15px_rgba(99,102,241,0.8)] transition-all duration-300">
                    <IoIosSend className="text-xl" /> Email Me
                </Button>
            </div>
        </div>
    );
}

export default InfoSection;
