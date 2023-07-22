import React from 'react';
import { Navbar, Nav, Container, Card, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useRef } from 'react';
import classes from './Sigup.module.css'

function SignupForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
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
        
        <input type='password' id='password' required ref={passwordRef}  placeholder='CONFIRM PASSWORD'/>
      </div>
      <Button>SIGNUP</Button>
       
      </form>
      <Button>Have Already Account ? LOGIN</Button>  
    </section>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignupForm;
