import { useState } from "react";
import Navbar from "./AdminNavbar";
import Sidebar from "./AdminSidebar";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { API_URL } from "../config";

function AdminQuery() {
  const [active, setActive] = useState("Query");

  const { submittedQueries, setSubmittedQueries } = useOutletContext();

  const today = dayjs().format("DD-MM-YYYY");

 const handleDelete =  async(id) => {
  try {
     const res = await axios.delete(`${API_URL}/api/v1/admin/getquery/${id}` ,  {withCredentials : true} )

    if(res.data.message){
     
        setSubmittedQueries((prev) =>
      prev.filter((query) => query._id !== id)
        );
      if(res.data.error){
        console.log(res.data.error)
      }
    }
  } catch (error) {
      console.log(error);
      
  } 
   
    
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{
        backgroundImage: "url('/questionsss.png')",
        backgroundRepeat: "repeat",
      }}
    >
      <Navbar />

      <div className="absolute inset-0 z-0 backdrop-blur-md bg-white/20"></div>

      <div className="h-[calc(100vh-60px)] flex z-10">
        <Sidebar setActive={setActive} active={active} />

        <div className="flex-1 flex  flex-col justify-center items-center p-6">
            <p className="text-2xl font-bold p-5"> Query of Students / Teacher</p>
          {submittedQueries?.length === 0 ? (
            <p className="text-gray-600 text-lg">No queries found.</p>
          ) : (
            <div className="w-full max-w-2xl bg-white p-5 rounded-2xl h-[80vh] overflow-y-auto scrollbar-hide flex flex-col gap-4">
              {submittedQueries.map((q) => (
                <div
                  key={q._id}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col md:flex-row gap-4"
                >
                  <div className="flex-1 overflow-hidden">
                    <p className="text-red-500 font-medium mb-1">
                      Date - {today}
                    </p>

                    <p className="text-gray-800 break-words">
                      Reason: {q.Reason}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="bg-red-500 px-3 py-1 rounded-2xl text-white font-medium">
                      Expired
                    </p>

                    <button
                      onClick={() => handleDelete(q._id)}
                      className="bg-black text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminQuery;
