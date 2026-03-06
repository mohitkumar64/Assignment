import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import {API_URL} from "./config"

function Login() {
 const [error , setError] = useState(false);
  const handleSuccess = async (cred) => {
    try {
      await axios.get(`${API_URL}/auth/google/callback`, {
        params: {
          credential: cred.credential,
          role: "student" 
        },
        withCredentials: true
      });

      
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed", err);
      setError(true);
      setInterval(() => {
        window.location.href = "/login";
      }, 5000);
      
    }
  };

  return (
    <div>
              {!error &&
          <div className="flex hover:  w-50 text-2xl justify-center items-center">
              <GoogleLogin 
              
              size="large"
            onSuccess={handleSuccess}
            onError={() => console.log("Google Login Failed")}
          />


        </div>}

           {
            error && 
            <div className="flex bg-white border-slate-300 border p-5 text-xl font-bold "> 
              Login failed ❌
            </div>
           }    

    </div>
    

    
  );
}

export default Login;
