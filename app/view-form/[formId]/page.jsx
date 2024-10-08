"use client"
import FormUi from '@/app/edit-form/_components/FormUi';
import { db } from '@/configs';
import { forms } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function LiveForm(params) {

  useEffect(()=> {
    params && getFormData()}, [params]);

  const [jsonForm, setJsonForm] = useState({});
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedBg, setSelectedBg] = useState();
  const [selectedStyle, setSelectedStyle] = useState();
  const [enabledSignIn, setEnabledSignIn] = useState();


  const getFormData = async () => {
    const result = await db.select().from(forms)
    .where(eq(forms.id, params?.params.formId));

    const form = JSON.parse(result[0].jsonform);
    setJsonForm(form);
    result[0].theme && setSelectedTheme(result[0].theme);
    result[0].background && setSelectedBg(result[0].background);
    result[0].style && setSelectedStyle(result[0].style);
    setEnabledSignIn(result[0].enabledSignIn);

}

  return (
    <div className={`${selectedBg}`}>
      <div className={`p-10 flex items-center justify-center `}>
            
            <FormUi 
                formId={params?.params.formId}
                jsonForm={jsonForm}
                selectedTheme={selectedTheme}
                selectedStyle={selectedStyle}
                editable={false}
                enableSignIn={enabledSignIn}
            />         
        
      </div>
      <Link className='space-y-2 items-center fixed bottom-5 mx-2 px-4 py-3 text-xs cursor-pointer rounded-lg bg-slate-300 bg-opacity-50'
        href={"/"}
      >
            <Image 
                src={"/logo.svg"}
                width={100}
                height={50}
                alt='logo'
            />
            Build your own Ai form
        </Link>
    </div>
  )
}

export default LiveForm