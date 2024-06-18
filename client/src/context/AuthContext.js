import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const authContext = createContext();

const contextProvider = ({children})=>{
    const [user, setUser] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8000/getuser')
        .then((res)=>{
            setUser(res.data.user)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

return(
    <authContext.Provider >
        {children}
    </authContext.Provider>
)
}
export default contextProvider