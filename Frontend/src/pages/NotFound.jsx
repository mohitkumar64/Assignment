import Lottie from "lottie-react";
import animationData from "./json/404 error.json"; 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NotFound(){
    const navigate = useNavigate();

    useEffect(()=>{

       const timer = setTimeout(()=>{
       
        navigate('/');
       }, 5000)

    return ()=> clearTimeout(timer);

    },[navigate])
    return(
        <div className="w-full h-screen bg-white">     
     

            <div className="flex justify-center bg-white items-center ">
                <Lottie
                    animationData={animationData}
                    loop={true}
                />
            </div>
  
            <p className="text-4xl text-red-800  text-center font-bold heading">Shortly you be directed  </p>

       </div>
    )
}