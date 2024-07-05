"use client"
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { db } from '@/configs';
import { userResponses } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { count, eq } from 'drizzle-orm';
import { Loader2, Share } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx"

function ResponsesListItem({form}) {
    const jsonForm = JSON.parse(form?.jsonform);

    const [loading, setLoading] = useState(false);

    const {user} = useUser();

    const [responseCount, setResponseCount] = useState(0);

    useEffect(() => {
        user && getResponseCount();
    }, [])

    const getResponseCount = async() => {
        const result = await db.select({count: count()}).from(userResponses)
        .where(eq(form?.id, userResponses?.formId));

        setResponseCount(Number(result[0].count));
    }

    const exportData = async() => {
        let jsonData = [];
        setLoading(true);
        const result = await db.select().from(userResponses)
        .where(eq(form?.id, userResponses?.formId));

        if (result) {
            result.forEach((item) => {
                const jsonItem = JSON.parse(item.jsonResponse);
                jsonData.push({ timeStamp: item.filledAt, ...jsonItem});
            })
            setLoading(false);
        } 
        exportToExcel(jsonData);
    }

    // convert json to excel and then convert it

    const exportToExcel = (jsonData) => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(jsonData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `Responses.xlsx`);

    }

  return (
    <div className='border shadow-sm rounded-lg p-4 my-2'>
        <div>
        <h2 className=''>{jsonForm.formTitle}</h2>
        <h2 className='text-sm text-gray-600 mt-2'>{jsonForm.formSubHeading}</h2>
        </div>
        <hr className='my-4'/>
        <div className='flex justify-between items-center px-2'>
            {responseCount === 1?<h1 className='text-sm'><strong>1</strong> Response</h1> : <h1 className='text-sm'><strong>{responseCount}</strong> Responses</h1>}
            <HoverCard>
            <HoverCardTrigger asChild>
                
                <Button 
                    className="w-8 h-8 p-2" 
                    variant="ghost"
                    onClick={()=>exportData()}
                    disabled={loading}
                >
                    {loading? <Loader2 className='animate-spin'/> :<Share/>}
                </Button>
                
            </HoverCardTrigger>
            <HoverCardContent className="w-fit text-sm">
                <p>Export</p>
            </HoverCardContent>
        </HoverCard>
        </div>
    </div>
  )
}

export default ResponsesListItem