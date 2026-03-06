import { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import axios from "axios";
import dayjs from 'dayjs'
import { API_URL } from "../../config";

function PostQuery() {
  const [query, setQuery] = useState("");
  const [submittedQueries, setSubmittedQueries] = useState([]);
 

  

  

  useEffect(() => {
    async function getQueries() {
      try {
        const res = await axios.get(`${API_URL}/api/user/query`,{ withCredentials: true }
        );
        console.log(res.data);
        
        setSubmittedQueries(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    getQueries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      
      const res = await axios.post(`${API_URL}/api/user/query`,{ query },{ withCredentials: true });

      setSubmittedQueries((prev) => [res.data, ...prev]);
      setQuery("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="h-screen "
      style={{
        backgroundImage: "url('/questionsss.png')",
        backgroundRepeat: "repeat",
      }}
    >
      
      <Navbar />
     <div className="absolute inset-0 z-2 backdrop-blur-md bg-white/20"></div>


      <div className="h-[calc(100vh-60px)] z-10 flex flex-col items-center px-4 py-10 gap-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl z-10 bg-white border border-blue-200 rounded-xl shadow-md p-6"
        >
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your query clearly..."
            className="w-full h-40 resize-none border border-blue-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Query
          </button>
        </form>

        {submittedQueries.length > 0 && (
          <div className="w-full h-[60vh] scrollbar-hide  rounded-xl overflow-y-scroll z-10 max-w-2xl flex flex-col gap-4">
            {submittedQueries.map((q, i) => (
              <div
                key={i}
                className="bg-blue-50 border flex flex-wrap md:gap-5 border-blue-200 rounded-xl p-5"
              >
              <div className="flex-1 h-16 scrollbar-hide overflow-hidden hover:overflow-y-auto transition-all duration-300
              ">
                <p className="text-red-500 font-medium mb-1">
                  {`Date - ${dayjs(q.createdAt).format("DD-MM-YYYY")}`}
                </p>

                <p className="text-gray-800 whitespace-pre-wrap break-words">
                  {`Reason : ${q.Reason}`}
                </p>
              </div>
                <div className="flex flex-1 justify-end items-center">
                  <p className="bg-red-500 p-3 rounded-2xl text-white font-medium ">{`expire at - ${dayjs(q.expireAt).format("DD-MM-YYYY")}`}</p>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostQuery;
