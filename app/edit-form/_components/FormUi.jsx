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
import React from "react";
import FieldEdit from "./FieldEdit";

function FormUi({ jsonForm, onFieldUpdate, onFieldDelete, selectedTheme}) {

  return (
    <div className={`w-fit p-5 border rounded-lg`} data-theme={selectedTheme}>
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
                <Select >
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
                <RadioGroup className="p-2">
                  {field.fieldOptions?.map((option, index) => {
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.optionValue}
                          id={`option-${index}`}
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
                />
              )}
            </div>

              <div>
                <FieldEdit field={field} onUpdate={(value)=> onFieldUpdate(value, index)} onDelete={()=> onFieldDelete(index)}/>
              </div>
            </div>
          );
        })}
        <button className="btn btn-primary m-3">Submit</button>
      </div>
      
    </div>
  );
}

export default FormUi;
