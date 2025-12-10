import { type Ref } from "react"

interface TailInputProps {
  type : string,
  name : string,
  ref : Ref<HTMLInputElement>,
  placeholder : string,
  id : string
}

export default function TailInput({type, name, ref, placeholder, id} : TailInputProps) {
  return (
    <div>
      <input type={type} name={name} ref={ref} placeholder={placeholder} id={id}
              className="w-full h-full p-3 bg-white border border-gray-200 rounded-md focus:outline-blue-600 mb-5"/>
    </div>
  )
}
