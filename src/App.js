import logo from './logo.svg';
import './App.css';
import Signup from './SignUp/Signup';
import EmailCompose from './SignUp/EmailCompose';
import {BrowserRouter as Router,Switch,Route, } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './SignUp/authReducer';
import { useSelector } from 'react-redux';


function App() {
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  return (
   /* <Provider store={store}>
    
    
 <Signup/>
  </Provider>*/
  <Router>
    <Switch>
     
      <Route path="/" exact>
            {isLoggedIn ? (
               (
                // Render the add expense page if email is verified
                <EmailCompose />
              ) 
            ) : (
              <Signup/>
            )}
          </Route>
        
    </Switch>
  </Router>
  );
}

export default App;
