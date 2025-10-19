import React from 'react'
import { IoPeople } from "react-icons/io5";
import { useCoaches } from '../../query/hooks';
import {toast} from 'react-toastify';
import {FourSquare} from 'react-loading-indicators'
import { FaStar } from "react-icons/fa6";
import FilterCoach from './FilterCoach';
import CoachTable from './CoachTable';


const Statscard = () => {

    const {data: coaches, isLoading, error} = useCoaches()

    if(isLoading){
        return (
          <div className='flex justify-center items-center pt-56'>
            <FourSquare color="#00fffc" size="medium" text="Please Wait..." textColor="#00fffc" />
          </div>
        )
      }

    if(error){
      toast.error("Failed to load Stats Component")
    }


    const total = coaches?.length || 0;
    const active = coaches?.filter(c => c.status === 'active').length || 0;
    const inactive = coaches?.filter(c => c.status === 'inactive').length || 0;

    const avg = coaches?.length? coaches?.reduce((acc, c) => acc + (c.rating || 0),0) / coaches?.length : 0;

  return (
    <div className='bg-black'>
      <div className='sm:max-w-7xl p-5 m-auto py-5'>
        <h1 className='text-xl pb-3 sm:text-2xl font-bold text-cyan-500'>Coach Management</h1>
        <h5 className='text-sm sm:text-lg font-semibold text-cyan-500'>Manage and monitor your coaching team</h5>
      </div>

      <div className='text-cyan-500 sm:max-w-7xl m-auto p-5 sm:py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        <div className='grid grid-cols-[1fr_auto] max-w-full gap-10 sm:gap-17 p-5 border border-cyan-500 rounded-lg shadow-lg shadow-cyan-300'>
            <div>
              <h1 className='text-lg sm:text-xl pb-5'>Total Coaches</h1>
              <p className='text-3xl text-green-500'>{total}</p>
            </div>
            
            <div>
              <IoPeople size={35}/>
            </div>
        </div>

        <div className='grid grid-cols-[1fr_auto] max-w-full gap-17 p-5 border border-cyan-500 rounded-lg shadow-lg shadow-cyan-300'>
            <div>
                <h1 className='text-lg sm:text-xl pb-5'>Active Coaches</h1>
                <p className='text-3xl text-green-500'>{active}</p>
            </div>
            
            <div>
                <p className='text-green-500'><IoPeople size={35}/></p>
            </div>
        </div>

        <div className='grid grid-cols-[1fr_auto] max-w-full gap-17 p-5 border border-cyan-500 rounded-lg shadow-lg shadow-cyan-300'>
            <div>
                <h1 className='text-lg sm:text-xl pb-5'>Inactive Coaches</h1>
                <p className='text-3xl text-red-500'>{inactive}</p>
            </div>
            
            <div>
                <p className='text-red-500'><IoPeople size={35}/></p>
            </div>
        </div>

        <div className='grid grid-cols-[1fr_auto] max-w-full gap-17 p-5 border border-cyan-500 rounded-lg shadow-lg shadow-cyan-300'>
            <div>
                <h1 className='text-lg sm:text-xl pb-5'>Average rating</h1>
                <p className='text-3xl text-amber-500'>{avg.toFixed(1)}</p>
            </div>
            
            <div>
                <p className='text-amber-500'><FaStar size={35}/></p>
            </div>
        </div>
      </div>
      <FilterCoach/>
      <CoachTable/>
    </div>
  )
}

export default Statscard
