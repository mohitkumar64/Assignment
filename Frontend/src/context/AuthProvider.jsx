import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";


const AuthContext = createContext({
  user : null , loading : true , appointments: [],
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

   
    
   useEffect(() => {
    const restoreUser = async () => {
      try {
        // console.log('me route');
        
        const res = await axios.get(
          `${API_URL}/me`,  
          { withCredentials: true }
        );
        
        // console.log(res.data);
        setUser(res.data);
       
      } catch {
        // console.log("error in auth");
        
        setUser(null);
      } finally {
        setLoading(false); 
      }
    };

    restoreUser();
  }, []);

  useEffect(() => {
    if (!user?._id) return;
   
    

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/v1/Appointments`,
          { withCredentials: true }
        );
      
        
        setAppointments(res.data);

      } catch {
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [user?._id]);

function updateAppointmentStatus(id, newStatus) {
  setAppointments(prev =>
    prev.map(a =>
      a._id === id ? { ...a, Status: newStatus } : a
    )
  );
}

  
  return (
    <AuthContext.Provider value={{ user, setUser, loading , appointments , setAppointments , updateAppointmentStatus }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
 