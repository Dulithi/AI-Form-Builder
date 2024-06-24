import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { Edit, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

function FieldEdit({field, onUpdate, onDelete}) {

  const [label, setLabel] = useState(field.fieldLabel);
  const [placeholder, setPlaceholder] =useState(field.fieldPlaceholder);


  return (
    <div className='flex gap-2 pt-5 pe-3'>
      <Popover>
        <PopoverTrigger>
          <Edit className='text-gray-500 h-4 w-4  hover:text-black' />
        </PopoverTrigger>
        <PopoverContent className="space-y-2 p-5">
          <h2 className='mb-4 shadow-sm'>Edit Field</h2>
          <div className="space-y-1 pb-3">
            <Label>Label Name</Label>
            <Input type="text" onChange={(event) => setLabel(event.target.value)} value={label}/>
          </div>
          {field.fieldPlaceholder && <div className="space-y-1 pb-3">
            <Label>Placeholder</Label>
            <Input type="text" onChange={(event) => setPlaceholder(event.target.value)} value={placeholder}/>
          </div>}
          <PopoverClose asChild>
          <Button size="sm" className="text-xs m-2" onClick={()=> field.fieldPlaceholder? onUpdate({
            fieldLabel: label,
            fieldPlaceholder: placeholder
          }): onUpdate({
            fieldLabel: label
          })
          }>Update</Button>
        </PopoverClose>
          
        </PopoverContent>
      </Popover>
        
        

        <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className='text-gray-500 h-4 w-4  hover:text-red-600'/>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {label} field.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {onDelete()}}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  )
}

export default FieldEdit