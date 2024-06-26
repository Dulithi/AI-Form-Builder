"use client"

import { db } from '@/configs'
import { forms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormUi from '../_components/FormUi'
import { toast } from 'sonner'
import Controller from '@/app/dashboard/_components/Controller'

function EditForm({params}) {

    const {user} = useUser();
    const [jsonForm, setJsonForm] = useState({});
    const [updateTrigger, setUpdateTrigger] = useState();

    const router = useRouter();

    const [selectedTheme, setSelectedTheme] = useState("light");
    const [selectedBg, setSelectedBg] = useState();

    useEffect(()=>{user && getFormData();}, [user]);

    const getFormData = async () => {
        const result =await db.select().from(forms)
        .where(and(eq(forms.id, params?.formId), 
        eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)));

        const form = JSON.parse(result[0].jsonform);
        console.log(JSON.parse(result[0].jsonform));
        setJsonForm(form);
        result[0].theme && setSelectedTheme(result[0].theme);
        result[0].background && setSelectedBg(result[0].background);

    }

    const updateFormData = async () => {
        const result = await db.update(forms)
        .set({jsonform : jsonForm})
        .where(and(eq(forms.id, params?.formId), eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)));
        
    }


    useEffect(()=>{
        if(updateTrigger) {
            setJsonForm(jsonForm);
            updateFormData();
        }
        
    }, [updateTrigger]);

    const onFieldUpdate = (value, index) => {
        
        jsonForm.formFields[index].fieldLabel = value.fieldLabel;
        value.fieldPlaceholder && (jsonForm.formFields[index].fieldPlaceholder = value.fieldPlaceholder);

        setUpdateTrigger(Date.now());
        toast("Field updated!")
      }


    const onFieldDelete = (indexOfDeletedField) => {
        jsonForm.formFields = jsonForm.formFields.filter((field, index) => {return indexOfDeletedField !== index});
        setUpdateTrigger(Date.now());
        toast("Field has been deleted")

    }

    const updateControllerFields= async (value, columnName) => {
        const result = await db.update(forms)
        .set({[columnName]: value})
        .where(and(eq(forms.id, params?.formId), eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)))
        .returning({id:forms.id});

        toast(`${columnName} updated!`)
        
    }

  return (
    <div className='p-8'>
        <h2 className='w-32 flex items-center gap-2 hover:font-bold mb-3' onClick={()=>{router.back()}}>
            <ArrowLeft /> Back
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='border rounded-lg p-5 shadow-md'>
                <Controller 
                    selectedTheme={(value)=>{
                        updateControllerFields(value, "theme");
                        setSelectedTheme(value);
                        }}
                    selectedBg={(value)=>{
                        updateControllerFields(value, "background");
                        setSelectedBg(value);
                        }}
                    />
            </div>
            <div className={`md:col-span-2 p-8 border rounded-lg h-fit min-h-screen flex items-center justify-center ${selectedBg}`}>
            
                        <FormUi 
                            jsonForm={jsonForm}
                            onFieldUpdate={onFieldUpdate} 
                            onFieldDelete={onFieldDelete}
                            selectedTheme={selectedTheme}
                        />
                    
            </div>
        </div>
    </div>
  )
}

export default EditForm