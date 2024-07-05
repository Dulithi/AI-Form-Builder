import pricing from '@/app/_data/pricing'
import React from 'react'

function Upgrade() {
  return (
    <div className='p-10 dark:text-white h-screen'>
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
    {pricing.map((item, index) => (<div key={index}
      className="rounded-2xl border border-primary p-6 shadow-sm ring-1 ring-primary sm:order-last sm:px-8 lg:p-12"
    >
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-blue-300">
          {item.name}
          <span className="sr-only">Plan</span>
        </h2>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 dark:text-blue-300 sm:text-4xl"> ${item.price} </strong>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-400">{item.duration}</span>
        </p>
      </div>

      <ul className="mt-6 space-y-2">
       {item.features.map((feature, featureIndex) => (<li key={featureIndex} className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-primary"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

          <span className="text-gray-700 dark:text-gray-400"> {feature} </span>
        </li>))}
        
      </ul>

      <a
        href={item.link}
        target='_blank'
        className="mt-8 block rounded-full border border-primary bg-primary px-12 py-3 text-center text-sm font-medium text-white hover:bg-violet-800 hover:ring-1 hover:ring-violet-800 focus:outline-none focus:ring active:text-violet-500"
      >
        Get Started
      </a>
    </div>))}

    
  </div>
</div>
    </div>
  )
}

export default Upgrade