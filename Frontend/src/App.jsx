
import './App.css'
import {Routes , Route} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointment Page/Appointments'
import EditProfile from './pages/EditProfile Page/EditProfile'
import { LoginPage } from './pages/Auth/LoginPages'
import ProtectedRoute from './Protectedroute'
import AdminRoute from './AdminRoute'
import AdminPanel from './AdminPanel/AdminPanel'
import Users from './AdminPanel/Users'
import AdminEditProfile from './AdminPanel/AdminEditProfile'
import PostQuery from './pages/QueryPage/Query'
import AdminQuery from './AdminPanel/AdminQuery'
import {NotFound} from './pages/NotFound'
import { RegisterPage } from './pages/Auth/Register'


function App() {
 

  return (
    <>
   
     
        <Routes>


        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path='/query' element={<PostQuery />} />
           <Route element= {<AdminRoute />}>
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/adminpanel/allusers" element={<Users />} />
            <Route path="/queries" element={<AdminQuery />} />

            <Route path="/adminpanel/editProfile/:userId/:role"  element={<AdminEditProfile />} />
          </Route>
        </Route>

       

        <Route  path='/login' element={<LoginPage />} />
         <Route  path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFound />} />

     </Routes>
    </>
  )
}

export default App
