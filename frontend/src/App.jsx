import './App.css';
import Home from './pages/home/Home';
import Signup from './pages/signup/SignUp';
import Login from './pages/login/Login';
import {Toaster} from "react-hot-toast";
import {Navigate,Route,Routes} from "react-router-dom";
import { useAuthContext } from './context/authcontext';

function App() {
  const {authUser} = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to = {'/login'}/>} />
        <Route path='/signup' element={authUser ? <Navigate to = '/' /> : <Signup/>} />
        <Route path='/login' element={authUser ? <Navigate to = '/' /> : <Login/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;
