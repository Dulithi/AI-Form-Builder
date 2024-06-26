import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import themes from '@/app/_data/themes'

function Controller({selectedTheme}) {
  return (
    <div>
        <h2 className='my-2'>Select Themes</h2>
        <Select onValueChange={(value)=>selectedTheme(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
            {themes.map((theme, index)=> 
            <div className='border m-1 rounded-lg' style={{colorScheme: theme.colorScheme, color:theme['base-content'? 'base-content':'primary-content'], backgroundColor:theme['base-100']}}>
            <SelectItem key={index} value={theme.theme} >
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

    </div>
  )
}

export default Controller