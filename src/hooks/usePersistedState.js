import { useState } from "react"

export default function usePersistedState(key, defaultValue){

    const [ state, setState ] = useState(()=>{

        const persistedState = localStorage.getItem(key)

        if(persistedState){

            return JSON.parse(persistedState)
        }

        return defaultValue

    })

    const  setPersisted = (value) =>{

        let serialValue;

        setState(value)

        if(typeof value === 'function'){

            serialValue = JSON.stringify(value(state))

        }else{
          serialValue =   JSON.stringify(value)
        }

      localStorage.setItem(key,serialValue)

    }




    return(
        [
            state,
            setPersisted
        ]
    )
}