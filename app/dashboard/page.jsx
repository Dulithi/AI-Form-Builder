import { Button } from '@/components/ui/button'
import { SquarePlus } from 'lucide-react'
import React from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

function Dashboard() {
  return (
    <div className='p-10 h-screen'>
      <h2 className='font-bold text-3xl items-center justify-between flex'>Dashboard
      <CreateForm />
      </h2>
      {/* list of forms */}
      <FormList/>
    </div>
  )
}

export default Dashboard