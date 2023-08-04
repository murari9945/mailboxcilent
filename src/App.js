
import './App.css';
import Signup from './SignUp/Signup';

import EmailCompose from './SignUp/EmailCompose';
import {Routes,Route,useNavigate,Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Navbar from './SignUp/Navbar';
import Inbox from './SignUp/Inbox';
import Sentmail from './SignUp/Sentmail';


function App() {
  //const isLoggedIn = useSelector((state) => state.auth.token !== null);
  //const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  //console.log(isLoggedIn);
  
  return (
   <div>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path="/loggedin" element={<EmailCompose/>} />
    <Route path="/inbox" element={<Inbox/>}/>
    <Route path="/sentmail" element ={<Sentmail/>}/>
    </Routes>

   </div>
  
  );
}

export default App;
