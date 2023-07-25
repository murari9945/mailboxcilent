import logo from './logo.svg';
import './App.css';
import Signup from './SignUp/Signup';
import { Provider } from 'react-redux';
import store from './SignUp/authReducer';

function App() {
  return (
    <Provider store={store}>
     <Signup/>
    </Provider>
  );
}

export default App;
