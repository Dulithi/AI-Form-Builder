"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { db } from '@/configs';
import { forms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { Edit, Share2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { RWebShare } from 'react-web-share';
import { toast } from 'sonner';

function FormListItem({form, refreshData}) {
    const jsonForm = JSON.parse(form?.jsonform);

    const {user} = useUser();

    const onDeleteForm = async () => {
        const result = await db.delete(forms).where(and(eq(forms?.id, form.id), eq(forms.createdBy, form.createdBy)));
        if (result) {
            toast("Form Deleted!");
            refreshData();
        }

    }

  return (
    <div className='border shadow-sm rounded-lg p-4'>
        <div className='float-end ml-2'>
            
                <AlertDialog>
                    <AlertDialogTrigger>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                        <Trash2 className='h-4 w-4  hover:text-red-600'/>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-fit text-sm">
                            <p>Delete</p>
                        </HoverCardContent>
                    </HoverCard>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the Form.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {onDeleteForm()}}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                
        </div>
        <div>
        <h2 className=''>{jsonForm.formTitle}</h2>
        <h2 className='text-sm text-gray-600 mt-2'>{jsonForm.formSubHeading}</h2>
        </div>
        <hr className='my-4'/>
        <div className='flex justify-between'>
        <div>
      
        <HoverCard>
            <HoverCardTrigger asChild>
            <div>
                <RWebShare
                    data={{
                    text: `${jsonForm.formSubHeading}`,
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/view-form/${form.id}`,
                    title: `${jsonForm.formTitle}`,
                    }}
                    onClick={() => console.log("shared successfully!")}
                >
                    <Button className="w-8 h-8 p-2" variant="ghost"><Share2/></Button>
                </RWebShare>
            </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit text-sm">
                <p>Share</p>
            </HoverCardContent>
        </HoverCard>

      
    </div>
        
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link href={`/edit-form/${form?.id}`}>
                    <Button className="w-8 h-8 p-2" variant="ghost"><Edit/></Button>
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit text-sm">
                <p>Edit</p>
            </HoverCardContent>
        </HoverCard>
        </div>
    </div>
  )
}

export default FormListItem