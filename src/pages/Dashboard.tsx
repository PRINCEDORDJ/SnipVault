import React from 'react'
import { Languages } from '../component/SnipEditor'

const Dashboard = () => {
  return (
    <div className='max-lg:pt-2'>
      <div className='flex flex-wrap lg:items-center lg:justify-center shrink-0 gap-2'>
        {Languages.map((l, index) => {
          const isActive = index
          
          return (
          <div key={index} className={`border border-gray-400 px-5 py-1 rounded-l-full rounded-r-full `}>
              
              {l}
            </div>
          )
       })}
      </div>
    </div>
  )
}

export default Dashboard