import { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import Popup from "../function/Popup";
import { API_URL } from "../../config";

function Appointments() {
  const { user, appointments, setAppointments } = useAuth();

  const [activeTab, setActiveTab] = useState("pending");
  const [popupMessage, setPopupMessage] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [Teacher, setTeacher] = useState([]);

  // Teacher slot management
  const isTeacher = user?.role === "Teacher";
  const [newSlot, setNewSlot] = useState("");
  const [mySlots, setMySlots] = useState([]);

  // Student appointment form
  const [value, setValue] = useState({
    studentId: user._id,
    TeacherId: "",
    subject: "",
    reason: "",
    date: "",
    mode: "",
    TimeSlot: ""
  });

  const filterappointment = appointments?.filter(
    (a) => a.Status === activeTab
  );

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  function handleChange(e) {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  }

  async function handlePost() {
  // ---------- FRONTEND VALIDATION ----------
  if (!value.TeacherId) {
    setPopupMessage("Please select a teacher");
    return;
  }

  if (!value.subject) {
    setPopupMessage("Please select a subject");
    return;
  }

  if (!value.date) {
    setPopupMessage("Please select a date");
    return;
  }

  if (!value.TimeSlot) {
    setPopupMessage("Please select a time slot");
    return;
  }

  if (!value.reason.trim()) {
    setPopupMessage("Please enter a reason");
    return;
  }

  // ---------- POST REQUEST ----------
  try {
    const res = await axios.post(
      `${API_URL}/api/v1/Appointments`,
      value,
      { withCredentials: true }
    );

    if (res.data.status) {
      setAppointments(prev => [...prev, res.data.appointment]);
      setPopupMessage("Appointment created successfully");

      setValue({
        studentId: user._id,
        TeacherId: "",
        subject: "",
        reason: "",
        date: "",
        mode: "",
        TimeSlot: ""
      });
    }
  } catch (error) {
    console.error(error);
    setPopupMessage("Something went wrong");
     setValue({
        studentId: user._id,
        TeacherId: "",
        subject: "",
        reason: "",
        date: "",
        mode: "",
        TimeSlot: ""
      });


  }
}

  // Teacher slot update handlers
  async function addTimeSlot() {
    if (!newSlot) return;

    const updated = [...mySlots, newSlot];
    setMySlots(updated);
    setNewSlot("");

  const update =   await axios.put(
      `${API_URL}/api/v1/Teacher/timeslots`,
      { TimeSlots: updated },
      { withCredentials: true }
    );

    console.log(update.data);
    
  }

  async function removeTimeSlot(slot) {
    const updated = mySlots.filter((s) => s !== slot);
    setMySlots(updated);

    await axios.put(
      `${API_URL}/api/v1/Teacher/timeslots`,
      { TimeSlots: updated },
      { withCredentials: true }
    );
  }

  // Fetch teachers (student) + own slots (teacher)
  useEffect(() => {
    const getTeacher = async () => {
      const res = await axios.get(
        `${API_URL}/api/v1/Teacher`,
        { withCredentials: true }
      );
      setTeacher(res.data);
    };

    if (!isTeacher) {
      getTeacher();
    }

    if (isTeacher) {
      axios
        .get(`${API_URL}/api/v1/Teacher/timeslots`, {
          withCredentials: true
        })
        .then((res) => {setMySlots(res.data || [])

           console.log(res.data);}
        );
       
        
    }
  }, [isTeacher]);

  return (
    <div className="min-h-screen bg-[#E9EDF5]">
      <Navbar />
      {popupMessage && (
        <Popup message={popupMessage} setPopupMessage={setPopupMessage} />
      )}

      {/* ===== Teacher Slot Update ===== */}
      {isTeacher && (
        <div className="p-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 max-w-xl">
            <p className="text-2xl font-semibold mb-4 heading">
              Update Your Time Slots
            </p>

            <div className="flex gap-3 mb-4">
              <input
                value={newSlot}
                onChange={(e) => setNewSlot(e.target.value)}
                placeholder="10:00 - 10:30"
                className={inputClass}
              />
              <button
                onClick={addTimeSlot}
                className="bg-blue-600 px-4 rounded-lg text-white font-semibold"
              >
                Add
              </button>
            </div>

            {mySlots.length > 0 ? (
              mySlots.map((slot) => (
                <div
                  key={slot}
                  className="flex justify-between items-center bg-slate-100 p-2 rounded mb-2"
                >
                  <span>{slot}</span>
                  <button
                    onClick={() => removeTimeSlot(slot)}
                    className="text-red-600 font-semibold"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-500">No slots added yet</p>
            )}
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col gap-6">

        {/* ===== Available Teachers (Student) ===== */}
        {!isTeacher && (
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-75 bg-white rounded-2xl border shadow-sm p-6">
              <p className="text-2xl font-semibold text-center mb-6 heading">
                Teacher Available for Appointment
              </p>

              <div className="grid grid-cols-1 bg-slate-200 rounded-xl text-center">
                <div className="grid grid-cols-4 gap-3 border-b font-semibold p-4">
                  <p>S.No</p>
                  <p>Name</p>
                  <p>Subjects</p>
                  <p>Time-slot</p>
                </div>

                {Teacher.map((t, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 p-4">
                    <p>{i + 1}</p>
                    <p>{t.name}</p>
                    <p>{t.subjects.join(", ")}</p>
                    <p>{t.TimeSlot.join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== Create Appointment (Student) ===== */}
            <div className="flex-1 min-w-75 bg-white rounded-2xl border shadow-lg p-6 max-h-[70vh] overflow-y-auto">
              <p className="text-3xl font-bold text-center mb-4 heading">
                Create Appointment
              </p>

              <div className="flex flex-col gap-3">
                <label>Teacher</label>
                <select
                  value={value.TeacherId}
                  className={inputClass}
                  onChange={(e) => {
                    const id = e.target.value;
                    setValue((prev) => ({ ...prev, TeacherId: id }));

                    const t = Teacher.find((x) => x._id === id);
                    setSubjects(t?.subjects || []);
                  }}
                >
                  <option value="">Select Teacher</option>
                  {Teacher.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>

                <label>Subject</label>
                <select
                  name="subject"
                  className={inputClass}
                  onChange={handleChange}
                >
                    <option value="">Select Subject</option>
                  {subjects.length > 0 ? (
                    subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))
                  ) : (
                    <option>Select teacher first</option>
                  )}
                </select>

                <label>Message</label>
                <textarea
                  rows={3}
                  name="reason"
                  value={value.reason}
                  onChange={handleChange}
                  className={inputClass}
                />

                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={value.date}
                  onChange={handleChange}
                  className={inputClass}
                />

                <label>Time Slot</label>
                <select
                  name="TimeSlot"
                  value={value.TimeSlot}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select slot</option>
                  {Teacher.find((t) => t._id === value.TeacherId)
                    ?.TimeSlot?.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                </select>

                <label>Mode</label>
                <select
                  name="mode"
                  value={value.mode}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="In person">In Person</option>
                  <option value="Online">Online</option>
                </select>

                <button
                  onClick={handlePost}
                  className="mt-4 rounded-lg bg-blue-600 py-2 font-semibold text-white"
                >
                  Create Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== Appointment List ===== */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex gap-4 mb-4">
            {["pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {filterappointment.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {filterappointment.map((v) => (
                <AppointmentCard
                  key={v._id}
                  appointment={v}
                  user={user}
                />
              ))}
            </div>
          ) : (
            <p>No {activeTab} appointments</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
