import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Sign-up';
import Password from './Components/Password';
import Forgotpass from './Components/Forgotpass';
import Profile from './Components/Profile';
import Changepass from './Components/Changepass';
import Dashboard from './Components/Dashboard';
import Notfound from './Components/Notfound';
import {Routes,Route,Navigate} from "react-router-dom";
function App() {
  return (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/password' element={<Password/>}/>
    <Route path='/forgotpassword' element={<Forgotpass/>}/>
    <Route path='/dashboard' element={<Dashboard/>}>
    <Route path='profile' element={<Profile/>}/>
    <Route path='changepassword' element={<Changepass/>}/>
    </Route>
    <Route path='*' element={<Notfound/>}/>
  </Routes>
  );
}

export default App;
