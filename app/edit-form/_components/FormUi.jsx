"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useRef, useState } from "react";
import FieldEdit from "./FieldEdit";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import moment from "moment";
import { toast } from "sonner";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function FormUi({formId, jsonForm, onFieldUpdate, onFieldDelete, selectedTheme, selectedStyle, editable=true, enableSignIn}) {

  const [formData, setFormData] = useState();
  let formRef = useRef();

  const {user, isSignedIn} =useUser();

  const handleInputChange= (event) =>{
    const {name, value} = event.target;
    setFormData({
      ... formData,
      [name]: value
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ... formData,
      [name]: value
    })
  }

  const handleCheckboxChange = (fieldName, optionName, value) => {
    const list = formData?.[fieldName]? formData?.[fieldName] : [];
    if (value) {
      list.push({
        lable: optionName,
        value: value
      })
      setFormData({
        ... formData,
        [fieldName]: list
      })
    }else {
      const result = list.filter((item)=> item.lable === optionName);
      setFormData({
        ... formData,
        [fieldName]: result
      })
    }

  }

  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    const result=await db.insert(userResponses)
    .values({
      formId: formId,
      jsonResponse: formData,
      filledAt: moment().format(),
    })

    if(result) {
      toast("Response submitted successfully!");
      formRef.reset();
    }
    else {
      toast("Error!");
    }
  }

  return (
    <form 
      ref={(e) => formRef=e}
      onSubmit={onFormSubmit}
      className={`w-fit p-5 rounded-lg border ${selectedStyle}`} 
      data-theme={selectedTheme} 
      >
      <div className="border rounded-lg  p-5 mb-3">
        <h1 className="text-2xl font-bold pb-2">{jsonForm?.formTitle}</h1>
        <h2 className="text-gray-600">{jsonForm?.formSubHeading}</h2>
      </div>
      <div className="border rounded-lg p-5">
        {jsonForm?.formFields?.map((field, index) => {
          return (
            <div key={index} className="flex items-center">
            <div className="p-3 grid items-center w-full">
              <Label className="mb-2" htmlFor={`field-${index}`}>
                {field.fieldLabel}
              </Label>
              {field.fieldType === "select" ? (
                <Select reqired={field.fieldRequired} onValueChange={(value)=>handleSelectChange(field.fieldName, value)}>
                  <SelectTrigger className="bg-transparent">
                    <SelectValue placeholder={field.fieldPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.fieldOptions?.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.fieldType === "radio" ? (
                <RadioGroup className="p-2" reqired={field.fieldRequired.toString()}>
                  {field.fieldOptions?.map((option, index) => {
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.optionValue}
                          id={`option-${index}`}
                          onClick={()=>{handleSelectChange(field.fieldName, option.optionLabel)}}
                        />
                        <Label htmlFor={`option-${index}`}>
                          {option.optionLabel}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              ) : field.fieldType === "checkbox" ? (
                <div>
                  {field.fieldOptions ? (
                    field.fieldOptions.map((option, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            value={option.optionValue}
                            id={`option-${index}`}
                            onCheckedChange={(value)=>{handleCheckboxChange(field.fieldLabel, option.optionLabel, value)}}
                            
                          />
                          <Label htmlFor={`option-${index}`}>
                            {option.optionLabel}
                          </Label>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        value={field.fieldName}
                        id={`option-${index}`}
                        required={field.fieldRequired}
                      />
                      <Label htmlFor={`option-${index}`}>
                        {field.fieldLabel}
                      </Label>
                    </div>
                  )}
                </div>
              ) : (
                <Input
                  type={field?.fieldType}
                  id={`field-${index}`}
                  placeholder={field.fieldPlaceholder}
                  name={field.fieldName}
                  className="bg-transparent"
                  required={field.fieldRequired}
                  onChange={(e)=>handleInputChange(e)}
                />
              )}
            </div>

              {editable && <div>
                <FieldEdit field={field} onUpdate={(value)=> onFieldUpdate(value, index)} onDelete={()=> onFieldDelete(index)}/>
              </div>}
            </div>
          );
        })}
        
        {enableSignIn? 
          <div>{isSignedIn? 
            <button type="submit" className="btn btn-primary m-3">Submit</button> 
            : <SignInButton mode="modal" className="btn btn-primary m-3">Sign in to submit</SignInButton> }</div>
          : <button type="submit" className="btn btn-primary m-3">Submit</button>}
      </div>
      
    </form>
  );
}

export default FormUi;
