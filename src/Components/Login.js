import React,{useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const[mail,setMail]=useState("");
    const[pass,setPass]=useState("");
    let[emailerror,setemailerror]=useState("");
    let[passerror,setpasserror]=useState("");
    let[dataerror,setdataerror]=useState("");
    const navigate=useNavigate();
    var validmaildata;
    var validpassdata;
    const checkmail=()=>{
        
        if(mail.trim()===""){
            setemailerror("");
            setdataerror("");
            validmaildata=false;
        }else if(!mail.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
            setemailerror("Please Enter a Valid Email ");
            validmaildata=false;
        }else{
            setemailerror("");
            setdataerror("");
            validmaildata=true;
        }
    }

    const checkpass=()=>{
       
        if(pass.trim()===""){
            setpasserror("");
            setdataerror("");
            validpassdata=false;
           }
           else{
            setpasserror("");
            setdataerror("");
            validpassdata=true;
       }
    }

    const fetchUserData = async () => {
      const response = await fetch('http://localhost:3500/api/v1/app/get'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    };

    const validation = async (event) => {
      event.preventDefault();
        checkmail();
        checkpass();
       
        if(validmaildata&&validpassdata){
          try {
            const userDataArray = await fetchUserData();
      
            // Check if any user data matches the input
            const matchFound = userDataArray.some((userData) => {
              return userData.email === mail && userData.password === pass;
            });
      
            if (matchFound) {
              
              navigate('/dashboard');
            } else {
              setdataerror("Invalid credentials")
            }
          } catch (error) {
            console.log("error")
          } 
          // window.open('dashboard');
          // window.location.reload()
        }else if(validmaildata){
          event.preventDefault();
          setpasserror("Field is required");
        }else if(validpassdata){
          event.preventDefault();
          setemailerror("Field is required");
        }else{
          event.preventDefault();
          setpasserror("Field is required");
          setemailerror("Field is required");
        }
     }
  return (
    <div className="container " >
    <div className="login1">
      <div className="title"><span>LOG IN</span></div>
      <form id="form" onSubmit={validation}>
        <div className="main">
        <div className="row">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Email" id="email-field" value={mail} onChange={(e)=>setMail(e.target.value)} onInput={checkmail} />
          <span id="error-msg">{emailerror}</span>
        </div>
        <div className="row">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" id="pass-field" value={pass} onChange={(e)=>setPass(e.target.value)} onInput={checkpass}/>
          <span id="error1-msg">{passerror}</span>
          <span id="error1-msg">{dataerror}</span>
        </div>
        <div className="row1">
          <NavLink to={"/forgotpassword"}>Forgot Password?</NavLink>
        </div>
        <div className="row button">
          <input type="submit" value="LOGIN" />
        </div>
        <div className="signup-link">Don't have an account? <NavLink to={"/signup"}>Sign up now</NavLink></div>
      </div>
        <div className="bottom">
           
          <p className="bttext">Login with Social Media</p>
          <div className="icons">
            <div className="fab fa-twitter-square"></div>
            <div className="fab fa-instagram"></div>
            <div className="fab fa-facebook-square"></div>
      </div>
      </div>
      </form>
    </div>
  </div>

  )
}

export default Login