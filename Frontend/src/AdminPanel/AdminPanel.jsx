import Navbar from './AdminNavbar'
import Sidebar from './AdminSidebar'
import { useAuth } from '../context/AuthProvider';
import FormatDate from '../pages/function/FormatDate';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';


export default function AdminPanel() {
  const [active , setActive] = useState('Dashboard')
  const {appointments}  = useAuth();
  const {allUsers ,submittedQueries} = useOutletContext();
  
  
  

  const stats = [
    { label: "Users", count: allUsers.length },
    { label: "Appointments", count: appointments.length },
    { label: "Queries", count: submittedQueries.length }
  ];

 
  return (
    <div className="h-screen flex flex-col">

     <Navbar />
     
      <div className="flex flex-1 overflow-hidden">

        <Sidebar active={active} setActive={setActive} />

        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto space-y-8">

         
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(stat => (
              <div
                key={stat.label}
                className="bg-white border border-blue-200 rounded-xl p-6"
              >
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stat.count}
                </p>
              </div>
            ))}
          </section>

       
          <section className="bg-white border scrollbar-hide h-[75vh] overflow-scroll border-blue-200 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-600">
                Recent Appointments
              </h2>

             
            </div>

            <div className="space-y-3">
              {appointments.map(app => (
                <div
                  key={app._id}
                  className="grid grid-cols-1 gap-4
                            md:grid-cols-5 md:items-center md:gap-6
                            border border-blue-100 rounded-md px-4 py-3 wrap-anywhere"
                >

                  <div>
                    <p className="font-medium">{app.studentId.name}</p>
                    <p className="text-sm text-gray-500">{app.studentId.email}</p>
                  </div>

                  <div>
                    <p className="font-medium text-red-500">
                      {app.TeacherId.name}
                    </p>
                    <p className="text-sm">
                      {`subject - ${app.subject}`}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-red-500">
                      {`Date - ${FormatDate(app.date)}`}
                    </p>
                    <p className="text-sm">
                      {`Time - ${app.TimeSlot}`}
                    </p>
                  </div>

                  <div className="md:col-span-2 md:text-right">
                    <span
                      className={`text-sm font-medium ${
                        app.Status === "approved"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {app.Status}
                    </span>
                  </div>

                </div>
              ))}
            </div>


          </section>

        </main>
      </div>
    </div>
  );
}
