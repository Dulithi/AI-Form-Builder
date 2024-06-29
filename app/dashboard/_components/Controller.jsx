"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'
import themes from '@/app/_data/themes'
import gradientBg from '@/app/_data/gradientBg'
import { Button } from '@/components/ui/button'
import style from '@/app/_data/style'
import Image from 'next/image'

function Controller({selectedTheme, selectedBg, selectedStyle}) {
    const [bgShowMore, setBgShowMore] = useState(false);
  return (
    <div>
        {/* Theme selection controller */}
        <h2 className='my-2'>Themes</h2>
        <Select onValueChange={(value)=>selectedTheme(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
            {themes.map((theme, index)=> 
            <div key={index} className='border m-1 rounded-lg' style={{colorScheme: theme.colorScheme, color:theme['base-content'? 'base-content':'primary-content'], backgroundColor:theme['base-100']}}>
            <SelectItem value={theme.theme} >
                <div className='flex gap-3'>
                    <div className='flex'>
                    <div className='w-5 h-5 rounded-l-lg' style={{backgroundColor:theme.primary}}></div>
                    <div className='w-5 h-5' style={{backgroundColor:theme.secondary}}></div>
                    <div className='w-5 h-5' style={{backgroundColor:theme.accent}}></div>
                    <div className='w-5 h-5 rounded-r-lg' style={{backgroundColor:theme.neutral}}></div>
                    </div>
                    {theme.theme} 
                </div>
            </SelectItem> </div>)}
            </SelectContent>
        </Select>

        {/* background selection controller */}
        <h2 className='my-2 mt-8'>Background</h2>
        <div className='grid grid-cols-3 gap-4'>
            {gradientBg.map((bg, index)=>(!bgShowMore ? 
            index < 6 &&
                <div 
                key={index} 
                onClick={()=>selectedBg(bg.gradient)}
                className={`w-full h-[70px] ${bg.gradient} rounded-lg border hover:shadow-lg hover:border-black cursor-pointer flex items-center justify-center`}>
                    {index===0 && <p className='text-center text-sm'>{`${bg.name}`}</p>}
                </div>
            : <div key={index}
                onClick={()=>selectedBg(bg.gradient)}
                className={`w-full h-[70px] ${bg.gradient} rounded-lg border hover:shadow-lg hover:border-black cursor-pointer flex items-center justify-center`}>
                    {index===0 && <p className='text-center text-sm'>{`${bg.name}`}</p>}
            </div>
            ))}
        </div>
        <Button variant="ghost" size="sm" className="mt-5 w-full" onClick={()=>setBgShowMore(!bgShowMore)}>{!bgShowMore? "Show more" : "Show less"}</Button>

        {/* Style selection controller */}
        <h2 className='my-2 mt-8'>Style</h2>
        <div className='grid grid-cols-3 gap-4'>
            {style.map((item, index) => 
                <div key={index} 
                    onClick={()=>selectedStyle(item.value)}
                >
                    <div className='border shadow-md rounded-lg hover:border-black hover:shadow-lg'>
                        <Image className='rounded-lg' src={item.image} width={200} height={200} alt={item.name}/>
                    </div>

                    <p className='text-center text-xs text-gray-700 pt-2'>{item.name}</p>
                    
                </div>)}
        </div>


    </div>
  )
}

export default Controller