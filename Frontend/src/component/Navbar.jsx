import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {useAuth} from '../context/AuthProvider'
import { API_URL } from "../config";

import "../index.css"


function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const {user} = useAuth();
  const {role} = user;
  
  
  const navigate = useNavigate();

 async function handlelogout(){
  try {
      await axios.post(`${API_URL}/auth/logout` , {} , {
        withCredentials:true
      })

  } catch (error) {
    console.log(error)
  }finally{
     
      navigate('/login');
      
  }
      

      
  }

  return (
    <div className="sticky top-0 z-50">

     
      <nav className=" relative  bg-linear-to-b from-blue-600 to-blue-700 flex justify-between items-center px-6 h-[60px] shadow shadow-gray-400   ">
        
      
        <button onClick={() => setIsVisible(!isVisible)} className="z-30">
          <motion.div
            className="flex flex-col gap-1"
            animate={
              isVisible
                ? { rotate: 90,  }
                : { rotate: 0,   }
            }
          >
            <div className="h-[5px] w-10 bg-black"></div>
            <div className="h-[5px] w-10 bg-black"></div>
            <div className="h-[5px] w-10 bg-black"></div>
          </motion.div>
        </button>

                        
              <div className="flex items-center gap-2 md:gap-6 text-sm">
                { role === "Admin" ?  
                <NavLink
                      to="/adminpanel"
                      className="px-4 py-2 rounded-md font-medium
                                text-white hover:bg-blue-600 transition flex gap-2 items-center"
                    >
                     <img src="/admin-panel.png" alt="" className="w-6 h-6" /> Admin Panel
                  </NavLink> :
                  <NavLink
                      className="px-4 py-2 rounded-md font-bold
                                text-white  hover:bg-white hover:text-blue-600 text-lg transition flex gap-2 items-center"
                    >
                     <span className="w-4 h-4 animate-pulse bg-red-500 rounded-full"></span> {role}
                  </NavLink> 
                  
                  }

                  <button
                      onClick={handlelogout}
                      className="px-4 py-2 rounded-md font-medium
                                text-white border border-white/40
                                hover:bg-white hover:text-blue-700
                                transition flex items-center gap-2"
                    >
                      Logout  <img src="/user-logout.png" alt="" className="w-5 h-5" />
                  </button>
              </div>


      </nav>


      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 0.3 }}
            className=" fixed top-15  left-0 h-screen w-[250px] bg-linear-to-b from-blue-600 to-blue-600 border-r border-[#4E71FF] z-10 shadow-xl"
          >
           
            <div className="flex flex-col gap-y-3  py-4 px-2 text-xl">
                <NavLink className={"p-2 pl-5 rounded-md inline-flex shadow-md shadow-blue-950 text-white transition-all hover:-translate-y-2 gap-3 items-center hover:shadow-xl "} to="/"> 
                <div className="object-fit w-15 h-10"><img  className="w-10 h-10" src="icons8-dashboard-100.png" alt="" /></div> Dashboard</NavLink>
                <NavLink className={"p-2  rounded-md  flex gap-3 shadow-md shadow-blue-950 text-white transition-all hover:-translate-y-2 hover:shadow-xl "} to="/editProfile">  
                <div className="w-15 h-10 object-fit">
                     <img  className="w-10 h-10" src="icons8-edit-100.png" alt="" /> 
                </div>
               
                Edit Profile</NavLink>
                <NavLink className={"p-2  rounded-md flex  gap-3 shadow-md shadow-blue-950 text-white transition-all hover:-translate-y-2 hover:shadow-xl "} to="/appointments"> 
                <div className="object-fit w-15 h-10 ">
                    <img  className="w-10 h-10" src="icons8-appointment-100.png" alt="" />
                  </div>  Appointments</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Navbar;
