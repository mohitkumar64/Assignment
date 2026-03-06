 
 import { useNavigate } from "react-router-dom";
 
 export default function Sidebar({ active, setActive }) {
  const navigate = useNavigate();
  const items = [
    {label : "Dashboard" , link : '/adminpanel' , src : "/admin-panel.png"},
    {label : "UserDashboard" , link : '/' , src : "/dashboard.png"},

    {label : "Users", link : '/adminpanel/allUsers' , src : "/users.png"},
    {label : "Queries" , link : '/queries' , src : "/que.png"},
    
  ];

  return (
    <div
      className="group z-10 bg-blue-50 h-full transition-all duration-300
                 w-20 hover:w-56 border-r border-blue-200"
    >
      <div className="flex flex-col gap-2 p-2 mt-4">
        {items.map(item => (
          <button
            key={item.label}
            onClick={() => {
              
              setActive(item.label)
              navigate(item.link)

            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-md
              hover:bg-blue-100 hover:translate-x-10 transition duration-300
              ${active === item.label ? "bg-blue-200" : ""}`}
          >
            <img  className="max-h-20 " src={item.src} alt="d" />
            <span className="hidden  group-hover:inline text-sm font-medium">
                  {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
