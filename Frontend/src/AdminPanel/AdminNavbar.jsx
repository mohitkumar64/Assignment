import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
function Navbar() {;
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
    <div className="h-14 z-10 bg-blue-600 text-white flex items-center justify-between px-6">
      <h1 className="font-semibold text-lg">Admin Dashboard</h1>

      <button
        onClick={handlelogout}
      className="bg-blue-500 hover:bg-blue-400 px-4 py-1 rounded-md">
        Logout
      </button>
    </div>
  );
} 

export default Navbar