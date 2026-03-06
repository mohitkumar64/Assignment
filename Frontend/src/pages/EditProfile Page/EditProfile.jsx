import axios from "axios";
import Navbar from "../../component/Navbar";
import { useAuth } from "../../context/AuthProvider";
import { useState, useRef } from "react";
import dayjs from "dayjs";
import Popup from "../function/Popup";
import { API_URL } from "../../config";


function EditProfile() {
  const { user, setUser } = useAuth();
  const fileRef = useRef(null);

  const [show, setShow] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const { role } = user;

  const [value, setValue] = useState({
    name: user?.name ?? "",
    FatherName: user?.FatherName ?? "",
    MotherName: user?.MotherName ?? "",
    DateOfBirth: user?.DateOfBirth ?? "",
    RollNumber: user?.studentInfo?.RollNumber ?? "",
    Course: user?.studentInfo?.Course ?? "",
    Branch: user?.studentInfo?.Branch ?? "",
    Year: user?.studentInfo?.Year ?? ""
  });

  // ================= IMAGE UPLOAD =================
  async function handleImage(file) {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.put(
        `${API_URL}/api/user/uploadimage`,
        formData,
        { withCredentials: true }
      );

      setUser(prev => ({
        ...prev,
        ProfileImage: res.data.image,
      }));

      setPopupMessage("Image uploaded successfully");

    } catch (err) {
      console.error(err);
      setPopupMessage("Image upload failed");
    }
  }


  function handleChange(e) {
    const { name, value } = e.target;
    setValue(prev => ({ ...prev, [name]: value }));
  }

  
  async function handleUpdate() {
    try {
      const res = await axios.put(
        `${API_URL}/api/user/updateUser`,
        value,
        { withCredentials: true }
      );

      setUser(res.data);
      setPopupMessage("Profile updated successfully");
    } catch {
      setPopupMessage("Profile update failed");
    }
  }

  return (
    <div className="min-h-screen bg-[#E9EDF5]">
      <Navbar />

      {popupMessage && (
        <Popup message={popupMessage} setPopupMessage={setPopupMessage} />
      )}

      <div className="m-4 md:m-5 flex flex-col md:flex-row gap-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-10">

      
        <div className="flex justify-center md:justify-center md:w-1/3">
          <div
            className="relative w-40 h-40 md:w-60 md:h-60 rounded-full border-2 overflow-hidden group"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <img
              src={
                user.ProfileImage ||
                "https://i.pinimg.com/1200x/f9/b0/6e/f9b06eea4f4f576ca92fa2f35e6206f7.jpg"
              }
              className="w-full h-full object-cover"
              alt="Profile"
            />

            {show && (
              <div
                onClick={() => fileRef.current.click()}
                className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer transition-all"
              >
                <span className="text-white text-xl">✏️ Edit</span>
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImage(e.target.files[0])}
            />
          </div>
        </div>
 
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {[
              { label: "Name", name: "name" },
              { label: "Father Name", name: "FatherName" },
              { label: "Mother Name", name: "MotherName" },
            ].map(({ label, name }) => (
              <div key={name} className="flex flex-col">
                <label className="heading font-medium text-xl">{label}</label>
                <input
                  name={name}
                  value={value[name]}
                  onChange={handleChange}
                  className="px-3 border-b-2 border-gray-400 focus:border-black outline-none"
                />
              </div>
            ))}

            <div className="flex flex-col">
              <label className="heading font-medium text-xl">D.O.B</label>
              <input
                type="date"
                name="DateOfBirth"
                value={dayjs(value.DateOfBirth).format("YYYY-MM-DD")}
                onChange={handleChange}
                className="px-3 border-b-2 border-gray-400 focus:border-black outline-none"
              />
            </div>

            {role === "student" && (
              <>
                {["RollNumber", "Course", "Branch", "Year"].map((field) => (
                  <div key={field} className="flex flex-col">
                    <label className="heading font-medium text-xl">{field}</label>
                    <input
                      name={field}
                      value={value[field]}
                      onChange={handleChange}
                      className="px-3 border-b-2 border-gray-400 focus:border-black outline-none"
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="flex justify-center md:justify-end mt-8">
            <button
              onClick={handleUpdate}
              className="bg-green-600 px-6 py-2 text-white rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 flex">
        <div className="bg-red-500 w-2 h-10 mr-2" />
        <p className="text-lg bg-green-400 px-4 border-green-500 border-2">
          <span className="font-bold ">Note:</span> Any other changes can only be changed by a Admin .
        </p>
      </div>
    </div>
  );
}

export default EditProfile;
