import { Button } from '@/components/ui/button'
import { SquarePlus } from 'lucide-react'
import React from 'react'
import CreateForm from './_components/CreateForm'

function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl items-center justify-between flex'>Dashboard
      <CreateForm />
      </h2>
    </div>
  )
}

export default Dashboard