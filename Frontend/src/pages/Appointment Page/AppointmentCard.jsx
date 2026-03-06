
import axios from "axios";
import FormatDate from "../function/FormatDate";
import { useAuth } from "../../context/AuthProvider";
import { API_URL } from "../../config";
import { useState } from "react";

function AppointmentCard({ appointment, user }) {
  const {updateAppointmentStatus} = useAuth();
 

  
  const {
    studentId,
    TeacherId,
    subject,
    reason,
    Status ,
    date,
    TimeSlot, _id
  } = appointment;
  
  const isTeacher = user?.role === "Teacher";
   const isApproved = Status === "approved";
  const isRejected = Status === "rejected";

  async function handleUpadte(Status) {
  try {
    
    const res = await axios.put(
      `${API_URL}/api/v1/Appointments`,
      { _id, Status: Status },
      { withCredentials: true }
    );

    if (res.status === 200) {
      updateAppointmentStatus(_id, Status);
      
    }
  } catch (err) {
    console.error("Update failed", err);
    alert("Failed to update appointment");
  }
}


  return (
    <div  className="w-full max-w-xl bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col gap-3">
      
      <div className="flex justify-between">
        <p className="font-semibold">
          Student: <span className="font-normal">{studentId.name}</span>
        </p>
        <p className="text-sm text-gray-500">{FormatDate(date)}</p>
      </div>

      <p>
        To: <span className="font-medium">{TeacherId.name}</span>
      </p>

      <p>
        Subject: <span className="font-medium">{subject}</span>
      </p>

      <p className="text-gray-700">
        Message: {reason}
      </p>

      <p className="text-sm">
        Time Slot: <span className="font-medium">{TimeSlot}</span>
      </p>

      {isTeacher && (
        
        <div className="flex justify-end gap-3 mt-2">
         { !isApproved &&
           <button
            onClick={()=>{
              
              handleUpadte("approved")}}
          
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
            Accept
          </button>
         }
          {
            !isRejected &&
            <button 
            onClick={() =>{
              handleUpadte('rejected')}}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
            Decline
          </button>
          }
          
        </div>
      )}
    </div>
  );
}

export default AppointmentCard;
