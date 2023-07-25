import React from 'react';
import { Navbar, Nav, Container, Card, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useRef,useState,useContext} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import classes from './Sigup.module.css'
import { authActions } from './authReducer';
//import {AuthContext} from './AuthContext';
import DummyPage from './Dummypage'

function SignupForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
 // const emailRef = useRef();
 // const passwordRef = useRef();
 // const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
 


 //const authContext = useContext(AuthContext);
  

 const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
 const token = useSelector((state) => state.auth.token);

 // const newPasswordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
 
  const submitHandler = (event) => {
    event.preventDefault();
    const givenEmail = emailRef.current.value;
    const givenPassword = passwordRef.current.value;
   

    setisLoading(true);

    if (isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGeIQdlMMvT97ANpDw1cZ8cOUqjLJp8qc', {
        method: 'POST',
        body: JSON.stringify({
          email: givenEmail,
          password: givenPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => {
          setisLoading(false);
          if (res.ok) {
            return res.json().then((data) => {
              const idToken = data.idToken;
              dispatch(authActions.login(idToken));
              console.log(idToken);
              //authContext.login(idToken);
             // history.push('/add-expense');
            });
          } else {
            return res.json().then((data) => {
              let errorMessage = 'Authentication failed';
              alert(errorMessage);
              console.log(data);
            });
          }
        })
        .catch((error) => {
          setisLoading(false);
          console.log('Error:', error);
        });
    } else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGeIQdlMMvT97ANpDw1cZ8cOUqjLJp8qc', {
        method: 'POST',
        body: JSON.stringify({
          email: givenEmail,
          password:givenPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => {
          setisLoading(false);
          if (res.ok) {
            // Handle successful sign-up
            //setIsAuthenticated(true);
            
          } else {
            return res.json().then((data) => {
              let errorMessage = 'Authentication failed';
              alert(errorMessage);
              console.log(data);
            });
          }
        })
        .catch((error) => {
          setisLoading(false);
          console.log('Error:', error);
        });
    }}
    if (isLogin && isLoggedIn) {
      // Render the dummy screen
      return (
        <section>
        
         
         <DummyPage idToken={token}/>
       
        </section>
      );
    }
   
  return (
    <Container>
      <Nav style={{display:'flex',flexDirection:'row',justifyContent:'center',backgroundColor:'greenyellow'}}>

      <Nav.Item style={{paddingRight:'50px'}}>
        <Nav.Link >Home</Nav.Link>
      </Nav.Item>

      <Nav.Item style={{paddingRight:'50px'}}>
        <Nav.Link eventKey="link-1">Products</Nav.Link>
      </Nav.Item>
      <Nav.Item style={{paddingRight:'50px'}}>
        <Nav.Link eventKey="link-2">About Us</Nav.Link>
      </Nav.Item>
      
    </Nav>

      <Card style={{ maxWidth: '300px',maxHeight:'800px', margin: '0 auto',backgroundColor:'red' }}>
      <div className={`${classes.circleContainer}`}/>
        <div className={`${classes.circle} ${classes.left}`} />
        <div className={`${classes.circle} ${classes.right}`} />
       
        <Card.Body>
        <section className={classes.auth}>
      
      <form>
        <div className={classes.control}>
          
          <input type='email' id='email' required ref={emailRef}  placeholder='EMAIL'/>
        </div>
        <div className={classes.control}>
        
          <input type='password' id='password' required ref={passwordRef}  placeholder='PASSWORD'/>
        </div>
        <div className={classes.control}>
        
        <input type='password' id='confirmpassword' required ref={passwordRef}  placeholder='CONFIRM PASSWORD'/>
      </div>
      <Button onClick={submitHandler}>SIGNUP</Button>
       
      </form>
      <Button onClick={switchAuthModeHandler}>Have Already Account ? LOGIN</Button>  
    </section>
        </Card.Body>
      </Card>
      
    </Container>
  );
}

export default SignupForm;
