
import {  Navigate , Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import LottieAnimation from './component/Lottie'
import loadingfx from './pages/json/SandyLoading.json'

export default function ProtectedRoute() {
  
 
  const {user , loading} = useAuth();
  

  
  
 
  if (loading) return (
    <div className="h-screen w-full bg-white flex justify-center items-center">
         <LottieAnimation animation={loadingfx} />
    </div>
   
  );
  if (!user  ){
    return <Navigate to='/login'  replace />;
  };
   


  return <Outlet />;
}


