"use client"
import { db } from '@/configs';
import { forms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ResponsesListItem from './_components/ResponsesListItem';

function Responses() {

  const {user} = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    user && getFormList();
  }, [user])

  const getFormList = async () => {
    const result = await db.select().from(forms)
    .where(eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(forms.id));

    setFormList(result);
}

  return (
    <div className='p-10 dark:bg-primary-foreground h-screen'>
      <h2 className='font-bold text-3xl items-center justify-between flex'>
        Responses
      </h2>
      <div className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-col-4 gap-3 pt-4'>
        {formList.map((form, index) => (
          <div key={index}>
            <ResponsesListItem form={form}/>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Responses