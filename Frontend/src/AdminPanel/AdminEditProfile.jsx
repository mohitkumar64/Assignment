import axios from "axios";
import Navbar from "./AdminNavbar";
import Sidebar from "./AdminSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
import Popup from "../pages/function/Popup";

function AdminEditProfile() {
  const { userId , role} = useParams();
  const [active, setActive] = useState("Users");
  const [popupMessage, setPopupMessage] = useState("");

  const [value, setValue] = useState({
    name: "",
    email: "",
    role: role || "student",
    subject: [],
    image: ""
  });

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await axios.post(
          `${API_URL}/api/v1/admin/getuserdata`,
          { _id: userId },
          { withCredentials: true }
        );

       
        setValue(res.data);
      } catch (err) {
        console.error(err);
        setPopupMessage("Failed to load user data");
      }
    }

    getUserData();
  }, [userId]);

  function handleRoleChange(e) {
    setValue(prev => ({
      ...prev,
      role: e.target.value,
      subject: e.target.value === "Teacher" ? prev.subject : []
    }));
  }

  function handleSubjectChange(e) {
    setValue(prev => ({
      ...prev,
      subject: e.target.value
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
    }));
  }

  async function handleUpdate() {
    try {
      const data = {
        id: userId,
        value: {
          role: value.role,
          subject: value.role === "Teacher" ? value.subject : []
        }
      };

      await axios.put(
        `${API_URL}/api/v1/admin/getallusers`,
        data,
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
      setPopupMessage("Something went wrong");
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#E9EDF5]">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar active={active} setActive={setActive} />

        {popupMessage && (
          <Popup message={popupMessage} setPopupMessage={setPopupMessage} />
        )}

        <div className="m-3 sm:m-5 flex flex-1 justify-center overflow-y-auto bg-white rounded-2xl
                        border border-slate-200 shadow-sm
                        p-6 sm:p-10">

          <div className="w-full max-w-xl space-y-6">

            {/* Profile Image (read-only) */}
            <div className="flex justify-center">
              <div className="w-40 h-40  lg:w-60 lg:h-60 rounded-full border-2 overflow-hidden">
                <img
                  src={value.image || "https://i.pinimg.com/1200x/f9/b0/6e/f9b06eea4f4f576ca92fa2f35e6206f7.jpg"}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name (read-only) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Name</label>
              <input
                value={value.name}
                disabled
                className="px-3 py-2 bg-gray-100 border rounded-md"
              />
            </div>

            {/* Email (read-only) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                value={value.email}
                disabled
                className="px-3 py-2 bg-gray-100 border rounded-md"
              />
            </div>

            {/* Role */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Role</label>
              <select
                value={value.role}
                onChange={handleRoleChange}
                className="px-3 py-2 border rounded-md outline-none"
              >
                <option value="student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Subjects (teacher only) */}
            {value.role === "Teacher" && (
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Subjects (comma separated)
                </label>
                <input
                  type="text"
                  value={value.subject?.join(",")}
                  onChange={handleSubjectChange}
                  placeholder="Math, Physics, Chemistry"
                  className="px-3 py-2 border rounded-md outline-none"
                />
              </div>
            )}

            {/* Update */}
            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                className="bg-blue-700 px-6 py-2 text-white
                           font-semibold rounded-xl hover:bg-blue-800"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminEditProfile;
