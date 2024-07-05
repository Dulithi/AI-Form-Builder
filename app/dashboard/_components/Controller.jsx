"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
import themes from '@/app/_data/themes'
import gradientBg from '@/app/_data/gradientBg'
import { Button } from '@/components/ui/button'
import style from '@/app/_data/style'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'

function Controller({currentTheme, currentStyle, selectedTheme, selectedBg, selectedStyle, setEnableSignIn, enabledSignIn}) {
    const [bgShowMore, setBgShowMore] = useState(false);
    const [theme, setTheme] =useState(currentTheme);
    const [formStyle, setFormStyle] =useState(currentStyle);

    // useEffect(() => {
    //     setTheme(currentTheme);
    // }, [currentTheme])
  return (
    <div>
        {/* Theme selection controller */}
        <h2 className='my-2'>Themes</h2>
        <Select onValueChange={(value)=>{
            selectedTheme(value);
            setTheme(value);
            }} defaultValue={theme}>
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
                className={`w-full h-[70px] ${bg.gradient} rounded-lg border hover:shadow-lg dark:hover:border-slate-400 hover:border-black cursor-pointer flex items-center justify-center`}>
                    {index===0 && <p className='text-center text-sm'>{`${bg.name}`}</p>}
                </div>
            : <div key={index}
                onClick={()=>selectedBg(bg.gradient)}
                className={`w-full h-[70px] ${bg.gradient} rounded-lg border hover:shadow-lg dark:hover:border-slate-400 hover:border-black cursor-pointer flex items-center justify-center`}>
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
                    onClick={()=>{
                        selectedStyle(item.value);
                        setFormStyle(item.value);
                        }}
                >
                {item.value === formStyle? <div className='border shadow-md rounded-lg hover:border-black hover:shadow-lg dark:hover:border-slate-400 ring-2 ring-slate-400'>
                        <Image className='rounded-lg' src={item.image} width={200} height={200} alt={item.name}/>
                    </div>: <div className='border shadow-md rounded-lg hover:border-black hover:shadow-lg dark:hover:border-slate-400'>
                        <Image className='rounded-lg' src={item.image} width={200} height={200} alt={item.name}/>
                    </div>
                    }
                    

                    <p className='text-center text-xs text-gray-700 pt-2 dark:text-gray-400'>{item.name}</p>
                    
                </div>)}
        </div>

        <div className='flex gap-2 items-center mt-10 text-sm'>
            <Checkbox onCheckedChange={(e) => setEnableSignIn(e)} checked={enabledSignIn}/>
            <h2>Enable social authentication before submitting the form</h2>
        </div>


    </div>
  )
}

export default Controller