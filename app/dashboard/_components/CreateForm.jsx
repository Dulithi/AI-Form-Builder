"use client"
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { LoaderCircle, SquarePlus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { aiChatSession } from '@/configs/aiModel';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs';
import { forms } from '@/configs/schema';
import moment from 'moment';
import { useRouter } from 'next/navigation';

const PROMPT = ", On the basis of the description please give me a form with formTitle, formSubHeading, formField, fieldName, fieldPlaceholder, fieldLabel, fieldType, and fieldRequired in json format. if fieldType is select include the fieldOptions. if fieldType is radio or checkbox, mention fieldOptions, optionLabel and optionValue."

function CreateForm() {
    const [userInput, setUserInput] = useState();
    const [loading, setLoading] = useState(false);
    const {user} = useUser();
    const route = useRouter();


    const onCreateForm = async ()=>{
        
        setLoading(true);
        const result = await aiChatSession.sendMessage(`Description: ${userInput}${PROMPT}`);

        if(result.response.text()){
            const res = await db.insert(forms).values(
                {
                    jsonform: result.response.text(),
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    crestedAt: moment().format(),
                }
            ).returning({id: forms.id});
            console.log("new form id: ", res[0].id);
            if(res[0].id){
                route.push(`/edit-form/${res[0].id}`);
            }
            setLoading(false);
        }
        setLoading(false);
    }
  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2"><SquarePlus />Create Form</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                <DialogTitle className="pb-3">Create new form</DialogTitle>
                
                
                    <div className="grid w-full gap-4">
                        <Textarea 
                            placeholder="Write a description of your form." 
                            className="resize-none h-32"
                            onChange={(event) => setUserInput(event.target.value)}
                            value={userInput}
                        />
                        <Button disabled={loading} onClick={()=>onCreateForm()}> 
                            {loading? <LoaderCircle className='animate-spin'/> : "Create"}
                        </Button>
                    </div>
                
                
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateForm