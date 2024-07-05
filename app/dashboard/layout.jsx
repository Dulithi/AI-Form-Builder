"use client"

import { SignedIn } from '@clerk/nextjs'
import React from 'react'
import SideNav from './_components/SideNav'

function DashboardLayout({children}) {
  return (
    <SignedIn>
    <div>
    
        <div className='md:w-64 fixed max-md:hidden dark:bg-primary-foreground'>
            <SideNav />
        </div>
        
        <div className='md:ml-64 dark:bg-primary-foreground'>
            {children}
        </div>
    </div>
    </SignedIn>
  )
}

export default DashboardLayout