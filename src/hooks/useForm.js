import { useState } from "react"

export default function useForm (submitHandler,initialValue){

    const [values, setValues] = useState(initialValue)

    const onChange =(e)=>{

        console.log('Change!');

        setValues(state => ({...state,[e.target.name]: e.target.value}))
    }

    const onSubmit =(e)=>{
       e.preventDefault()

       if(submitHandler){
        submitHandler(values)
       }

       setValues(initialValue)

    }
    const onReset =()=>{

        setValues(initialValue)
    }



    return {
        values,
        onChange,
        onSubmit,
        onReset

    }
}