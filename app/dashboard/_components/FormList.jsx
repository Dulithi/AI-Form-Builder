"use client"
import { db } from '@/configs';
import { forms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import FormListItem from './FormListItem';

function FormList() {

    const {user} = useUser();
    const [formList, setFormList] = useState([]);

    useEffect(()=>{
        user && getFormList();
    }, [user]);

    const getFormList = async () => {
        const result = await db.select().from(forms)
        .where(eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(forms.id));

        setFormList(result);

        console.log(result);
    }

  return (
    <div className='mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {formList.map((form, index)=>(
            <div key={index}>
                <FormListItem form={form} refreshData={getFormList}/>
            </div>
        ))}
    </div>
  )
}

export default FormList